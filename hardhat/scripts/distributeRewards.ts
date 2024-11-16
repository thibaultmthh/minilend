import { ethers } from "hardhat";

async function main() {
  // Contract address from your deployment
  const STAKING_POOL_ADDRESS = "0xAa65A85a674A54bBa3f3a11901b25b1c9150939E";

  // Get the contract instance
  const USDCStakingPool = await ethers.getContractFactory("USDCStakingPool");
  const stakingPool = USDCStakingPool.attach(STAKING_POOL_ADDRESS);

  console.log("Distributing rewards...");
  
  try {
    // Call distributeRewards
    const tx = await stakingPool.distributeRewards();
    await tx.wait();
    console.log("Rewards distributed successfully!");

    // Get the reward pool amount
    const rewardPool = await stakingPool.calculateRewardPool();
    console.log("Current reward pool:", rewardPool, "USDC");

  } catch (error) {
    console.error("Error distributing rewards:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 