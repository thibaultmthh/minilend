import { ethers } from "hardhat";
import { USDCStakingPool, IERC20 } from "../typechain-types";

async function main() {
  // Contract addresses
  const USDC_ADDRESS = "0x765de816845861e75a25fca122bb6898b8b1282a";
  const STAKING_POOL_ADDRESS = "0xd3C9afb7D775a99a349fC1dF34500248C5C3bE65"; // Address from your deployment
  
  // Amount to stake (assuming USDC has 6 decimals)
  const amountToStake = ethers.parseUnits("10", 0); // Staking 100 USDC
  
  // Get signer
  const [signer] = await ethers.getSigners();
  console.log("Interacting with contracts using account:", await signer.getAddress());

  // Get contract instances
  const usdc = await ethers.getContractAt("IERC20", USDC_ADDRESS) as IERC20;
  const stakingPool = await ethers.getContractAt("USDCStakingPool", STAKING_POOL_ADDRESS) as USDCStakingPool;

  // Check USDC balance
  const balance = await usdc.balanceOf(await signer.getAddress());
  console.log("USDC Balance:", ethers.formatUnits(balance, 18));

  // Approve USDC spending
  console.log("Approving USDC...");
  const approveTx = await usdc.approve(STAKING_POOL_ADDRESS, ethers.parseUnits("10", 18));
  await approveTx.wait();
  console.log("USDC approved");

  // Stake USDC
  console.log("Staking USDC...");
  const stakeTx = await stakingPool.stakeUSDC(amountToStake);
  await stakeTx.wait();
  console.log("Successfully staked", ethers.formatUnits(amountToStake, 18), "USDC");

  // Get staked balance
  const stakedBalance = await stakingPool.totalStake();
  console.log("Staked balance:", ethers.formatUnits(stakedBalance, 18), "USDC");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 