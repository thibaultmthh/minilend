import { ethers } from "hardhat";
import { USDCStakingPool } from "../typechain-types";

async function main() {
  // Contract address
  const STAKING_POOL_ADDRESS = "0x41bc724f0679f6184F25704749b0b24317386eDf"; // Your deployed contract address
  
  // Get signer
  const [signer] = await ethers.getSigners();
  console.log("Withdrawing with account:", await signer.getAddress());

  // Get contract instance
  const stakingPool = await ethers.getContractAt("USDCStakingPool", STAKING_POOL_ADDRESS);

  // Get current stake and rewards before withdrawal
  const totalStakeBefore = await stakingPool.totalStake();
  console.log("Total stake before withdrawal:", ethers.formatUnits(totalStakeBefore, 6), "USDC");


  // Withdraw stake and rewards
  console.log("Withdrawing stake and rewards...");
  const withdrawTx = await stakingPool.withdrawStakeAndRewards();
  await withdrawTx.wait();
  console.log("Successfully withdrawn stake and rewards");

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 