// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MockUSDCStakingPool  {
    using SafeERC20 for IERC20;

    IERC20 public usdc;

    struct User {
        uint256 stake;
        uint256 reward;
    }

    mapping(address => User) public users;
    uint256 public totalStake;
    uint256 public currentWave;

    // Events
    event SuppliedToLendingPlatform(uint256 wave, address indexed user, uint256 amount);
    event StakeAndRewardsWithdrawn(uint256 wave, address indexed user, uint256 amount);
    event RewardsDistributed(uint256 wave, uint256 totalReward);
    event RewardPool(uint256 wave, uint256 random);
    event WinnerSet(uint256 wave, address indexed user, uint256 reward);

    constructor(address _usdcAddress) {
        usdc = IERC20(_usdcAddress);
    }

    function stakeUSDC(uint256 amount) external {
        // Mimic transferring USDC to the contract
        usdc.safeTransferFrom(msg.sender, address(this), amount);
        
        // Update user stake
        users[msg.sender].stake += amount;
        totalStake += amount;

        emit SuppliedToLendingPlatform(currentWave, msg.sender, amount);
    }

    function distributeRewards() external  {
        // Increment wave for simplicity
        currentWave += 1;
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, currentWave))) % 100;
        emit RewardPool(currentWave, random);
    }

    // Simplified for mock: evenly distribute a fixed reward among users
    function setWinners(address[] calldata winners, uint256[] calldata rewards) external {
        uint256 totalRewardsDistributed = 0;
        for (uint256 i = 0; i < winners.length; i++) {
            users[winners[i]].reward += rewards[i];
            totalRewardsDistributed += rewards[i];
            emit WinnerSet(currentWave, winners[i], rewards[i]);
        }

        emit RewardsDistributed(currentWave, totalRewardsDistributed);
    }

    function withdrawStakeAndRewards() external {
        uint256 totalAmount = users[msg.sender].stake + users[msg.sender].reward;

        // Reset the user's stake and rewards
        users[msg.sender].stake = 0;
        users[msg.sender].reward = 0;

        // Mimic withdrawing by transferring USDC back to the user
        usdc.safeTransfer(msg.sender, totalAmount);

        emit StakeAndRewardsWithdrawn(currentWave, msg.sender, totalAmount);
    }
}