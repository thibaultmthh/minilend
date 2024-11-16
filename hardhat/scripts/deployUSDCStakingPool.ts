import { ethers } from "hardhat";
import * as hre from "hardhat";

async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  
  // Log the deployer address
  console.log("Deploying contracts with account:", await deployer.getAddress());

  // Deploy the USDCStakingPool contract
  const USDCStakingPool = await ethers.getContractFactory("USDCStakingPool");
  const usdcStakingPool = await USDCStakingPool.deploy(
    "0x765de816845861e75a25fca122bb6898b8b1282a", // USDC contract address
    "0x918146359264c492bd6934071c6bd31c854edbc3", // aUSDC contract address
    "0x970b12522ca9b4054807a2c5b736149a5be6f670"  // AavePool contract address
  );

  await usdcStakingPool.waitForDeployment();

  const usdcStakingPoolAddress = await usdcStakingPool.getAddress();
  console.log("USDCStakingPool deployed to:", usdcStakingPoolAddress);

  // Verify contract on Etherscan
  console.log("Waiting for block confirmations...");
  await usdcStakingPool.deploymentTransaction()?.wait(6);
  
  console.log("Verifying contract...");
  await hre.run("verify:verify", {
    address: usdcStakingPoolAddress,
    constructorArguments: [
      "0x765de816845861e75a25fca122bb6898b8b1282a",
      "0x918146359264c492bd6934071c6bd31c854edbc3", 
      "0x970b12522ca9b4054807a2c5b736149a5be6f670"
    ],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
