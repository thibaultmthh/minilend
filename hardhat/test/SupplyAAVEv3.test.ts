import {
  HardhatEthersSigner,
  USDCStakingPool,
} from "@nomicfoundation/hardhat-ethers/signers";
import { Contract } from "ethers";

const { expect } = require("chai");

import { ethers, network } from "hardhat";

describe("USDC and AavePool Interaction", function () {
  let usdc: Contract, aavePool: Contract;
  let investor: HardhatEthersSigner;
  let usdcStakingPool: USDCStakingPool;
  let impersonatedSigner: HardhatEthersSigner;

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
    investor = (await ethers.getSigners())[0];

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

  it("Approves and Supplies USDC to AavePool", async function () {
    const amountToSupply = ethers.parseUnits("5", 6); // Supplying 100 USDC
    console.log(amountToSupply)
    // Approve the Aave Lending Pool to spend our USDC
    const approveTx = await usdc
      .connect(impersonatedSigner)
      .approve(aavePool.target, amountToSupply);

    await approveTx.wait();

    // Check approval (this step is optional, just to show how it can be done)
    /* const allowance = await usdc.allowance(investor.address, aavePool.target);*/
    //expect(allowance).to.equal(amountToSupply);
    console.log(await usdc.balanceOf(impersonatedSigner.address));
    // Supply USDC to Aave Lending Pool
    // Aave's deposit function might require additional parameters such as `onBehalfOf` and `referralCode`.
    // Ensure you're passing the correct arguments as per Aave's LendingPool contract.
    const supplyTx = await aavePool
      .connect(impersonatedSigner)
      .supply(usdc.target, amountToSupply, impersonatedSigner.address, 0);

    await supplyTx.wait();

    // Optional: Add additional checks here to verify the supply was successful
  });
  it("allows users to stake USDC", async function () {
    const stakeAmount = ethers.parseUnits("5", 6); // 100 USDC
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
    for (let i = 0; i < 100; i++) {
      await network.provider.send("evm_mine");
    }

    // Check rewards after blocks have been mined
    const rewardPool = await usdcStakingPool.connect(impersonatedSigner).calculateRewardPool();
    console.log("Reward pool after mining blocks:", rewardPool);
    expect(rewardPool).to.be.gt(0, "Should have accumulated some rewards");
  });
});
