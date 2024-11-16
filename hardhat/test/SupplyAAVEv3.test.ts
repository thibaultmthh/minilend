import {
  HardhatEthersSigner,
} from "@nomicfoundation/hardhat-ethers/signers";
import { Contract } from "ethers";

const { expect } = require("chai");

import { ethers, network } from "hardhat";

describe("USDC and AavePool Interaction", function () {
  let usdc: Contract, aavePool: Contract;
  let investor: HardhatEthersSigner;
  let usdcStakingPool: Contract;
  let impersonatedSigner: HardhatEthersSigner;
  let beneficiarySigner: HardhatEthersSigner;

  before(async function () {
    const accountToImpersonate = "0x8fdc8b871355529741073c083a1c8a6a71853ee0";

    // Start impersonating the account
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [accountToImpersonate],
    });

    // Obtain a signer for the impersonated account
    impersonatedSigner = await ethers.getSigner(accountToImpersonate);
    // Load the signers
    const [_investor, _beneficiary] = await ethers.getSigners();
    investor = _investor;
    beneficiarySigner = _beneficiary;

    // Deploy the USDCStakingPool contract
    const USDCStakingPool = await ethers.getContractFactory(
      "USDCStakingPool",
      investor
    );

    // USDC and AavePool contract interfaces
    const USDCInterface = new ethers.Interface(require("./abis/USDC.json"));
    const AavePoolInterface = new ethers.Interface(
      require("./abis/AavePool.json")
    );

    // Attaching existing contracts
    usdc = new ethers.Contract(
      "0x765de816845861e75a25fca122bb6898b8b1282a",
      USDCInterface,
      investor
    );
    usdcStakingPool = await USDCStakingPool.deploy(
      "0x765de816845861e75a25fca122bb6898b8b1282a", // USDC contract address
      "0x918146359264c492bd6934071c6bd31c854edbc3", // aUSDC contract address, replace with actual address
      "0x970b12522ca9b4054807a2c5b736149a5be6f670" // AavePool contract address
    );
    await usdcStakingPool.waitForDeployment();
    aavePool = new ethers.Contract(
      "0x970b12522ca9b4054807a2c5b736149a5be6f670",
      AavePoolInterface,
      investor
    );
  });

  it("allows users to stake USDC", async function () {
    const stakeAmount = ethers.parseUnits("10", 18); // 100 USDC
    //approve usdc
    await usdc
      .connect(impersonatedSigner)
      .approve(usdcStakingPool.target, stakeAmount);
    // Check allowance
    const allowance = await usdc.allowance(impersonatedSigner.address, usdcStakingPool.target);
    console.log("Allowance:", allowance);
    await usdcStakingPool.connect(impersonatedSigner).stakeUSDC(stakeAmount);

    // Verify the stake was recorded correctly
    const userInfo = await usdcStakingPool
      .connect(impersonatedSigner)
      .users(impersonatedSigner.address);

    console.log(userInfo);
    expect(userInfo.toString()).to.equal(stakeAmount.toString());

    const totalStake = await usdcStakingPool
      .connect(impersonatedSigner)
      .totalStake();
    expect(totalStake.toString()).to.equal(stakeAmount.toString());

    // Mine a few blocks to simulate time passing and generate rewards
    for (let i = 0; i < 10; i++) {
      await network.provider.send("evm_mine");
    }
    // Test withdrawal functionality
    const initialBalance = await usdc.balanceOf(impersonatedSigner.address);
    await usdcStakingPool.connect(impersonatedSigner).withdrawStakeAndRewards();
    
    // Verify stake was reset to 0
    const userInfoAfterWithdraw = await usdcStakingPool.users(impersonatedSigner.address);
    expect(userInfoAfterWithdraw).to.equal(0);

    // Verify total stake was decreased
    const totalStakeAfterWithdraw = await usdcStakingPool.totalStake();
    expect(totalStakeAfterWithdraw).to.equal(0);

    // Verify user received their USDC back plus any rewards
    const finalBalance = await usdc.balanceOf(impersonatedSigner.address);
    expect(finalBalance).to.be.gt(initialBalance);
    // Check rewards after blocks have been mined 
    const rewardPool = await usdcStakingPool.connect(impersonatedSigner).calculateRewardPool();
    console.log("Reward pool after mining blocks:", rewardPool);
    expect(rewardPool).to.be.gt(0, "Should have accumulated some rewards");
  });

  it("allows staking on behalf of another user", async function () {
    const stakeAmount = ethers.parseUnits("5", 18);
    
    // Use the beneficiarySigner we got in the setup
    await usdc
      .connect(impersonatedSigner)
      .approve(usdcStakingPool.target, stakeAmount);

    // Initial state checks
    const initialBeneficiaryStake = await usdcStakingPool.users(beneficiarySigner.address);
    const initialTotalStake = await usdcStakingPool.totalStake();

    // Stake on behalf
    await usdcStakingPool
      .connect(impersonatedSigner)
      .stakeUSDCOnBehalf(beneficiarySigner.address, stakeAmount);

    // Verify the stake was recorded correctly for the beneficiary
    const beneficiaryInfo = await usdcStakingPool.users(beneficiarySigner.address);
    expect(beneficiaryInfo.toString()).to.equal(stakeAmount.toString());

    // Verify total stake increased
    const newTotalStake = await usdcStakingPool.totalStake();
    expect(newTotalStake).to.equal(initialTotalStake + stakeAmount);

    // Verify the beneficiary can withdraw their stake
    await usdcStakingPool.connect(beneficiarySigner).withdrawStakeAndRewards();
    
    const finalBeneficiaryStake = await usdcStakingPool.users(beneficiarySigner.address);
    expect(finalBeneficiaryStake).to.equal(0);
  });

  it("should fail when staking on behalf with zero amount", async function () {
    await expect(
      usdcStakingPool
        .connect(impersonatedSigner)
        .stakeUSDCOnBehalf(beneficiarySigner.address, 0)
    ).to.be.revertedWith("Amount must be greater than 0");
  });

  it("should fail when staking on behalf with zero address", async function () {
    const stakeAmount = ethers.parseUnits("5", 18);
    
    await expect(
      usdcStakingPool
        .connect(impersonatedSigner)
        .stakeUSDCOnBehalf(ethers.ZeroAddress, stakeAmount)
    ).to.be.revertedWith("Invalid beneficiary address");
  });

  it("should fail when staking on behalf without sufficient allowance", async function () {
    const stakeAmount = ethers.parseUnits("1000000", 18); // Very large amount
    
    await expect(
      usdcStakingPool
        .connect(impersonatedSigner)
        .stakeUSDCOnBehalf(beneficiarySigner.address, stakeAmount)
    ).to.be.revertedWith("ERC20: insufficient allowance");
  });
});
