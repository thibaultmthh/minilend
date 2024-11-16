// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ILendingPlatform {
    function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    function withdraw(address asset, uint256 amount, address to) external;
}

contract USDCStakingPool {
    address private _owner;
    IERC20 public usdc;
    IERC20 public aUSDC;
    ILendingPlatform public lendingPlatform;
    bool public winnersSet;

    struct User {
        uint256 stake;
    }

    uint256 public currentWave;
    uint256 public totalStake;
    uint256 public lastRewardBlock;
    uint256 public blocksPerWave; // Variable to manage time between waves

    mapping(address => User) public users;

    event SuppliedToLendingPlatform(uint256 wave, address user, uint256 amount);
    event StakeAndRewardsWithdrawn(uint256 wave, address user, uint256 amount);
    event RewardsDistributed(uint256 wave, uint256 totalReward);
    event RewardPool(uint256 wave, uint256 random);
    event WinnerSet(uint256 wave, address user, uint256 reward);
    event BlocksPerWaveUpdated(uint256 blocksPerWave);

    modifier onlyOwner() {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    constructor(address _usdcAddress, address _ausdcAddress, address _lendingPlatformAddress) {
        usdc = IERC20(_usdcAddress);
        aUSDC = IERC20(_ausdcAddress);
        lendingPlatform = ILendingPlatform(_lendingPlatformAddress);
        usdc.approve(_lendingPlatformAddress, type(uint256).max);
        _owner = msg.sender;
        blocksPerWave = 40320; // Default to ~1 week assuming 15s blocks
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function setBlocksPerWave(uint256 _blocksPerWave) external onlyOwner {
        blocksPerWave = _blocksPerWave;
        emit BlocksPerWaveUpdated(_blocksPerWave);
    }

    function stakeUSDC(uint256 amount) external {
        require(usdc.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        lendingPlatform.deposit(address(usdc), amount, address(this), 0);
        emit SuppliedToLendingPlatform(currentWave, msg.sender, amount);

        users[msg.sender].stake += amount;
        totalStake += amount;
    }

    function distributeRewards() external onlyOwner {
        require(block.number > lastRewardBlock + blocksPerWave, "Too early to call");
        lastRewardBlock = block.number;
        // Withdraw 1 wei of USDC to refresh aUSDC balance
        lendingPlatform.withdraw(address(usdc), 1, address(this));
        lendingPlatform.deposit(address(usdc), 1, address(this), 0);
        
        uint256 random = uint256(blockhash(block.number - 1)) % totalStake;
        emit RewardPool(currentWave, random);
        winnersSet = false;
        currentWave += 1;
    }

    function calculateRewardPool() public view returns (uint256) {
        uint256 currentUSDCValue = aUSDC.balanceOf(address(this));
        if (currentUSDCValue > totalStake) {
            return currentUSDCValue - totalStake;
        }
        return 0;
    }

    function setWinners(address[] calldata winners) external onlyOwner {
        require(winners.length > 0, "Winners not set");
        require(!winnersSet, "Winners already set for this wave");

        uint256 rewardPool = calculateRewardPool();
        require(rewardPool > 0, "No reward pool for this wave");

        uint256 totalRewards = 0;
        uint256 wave = currentWave - 1;
        uint256 rewards = rewardPool / winners.length;
        for (uint256 i = 0; i < winners.length; i++) {
            users[winners[i]].stake += rewards;
            totalRewards += rewards;
            emit WinnerSet(wave, winners[i], rewards);
        }
        totalStake += rewardPool;
        require(totalRewards == rewardPool, "Total rewards do not match the reward pool");
        emit RewardsDistributed(wave, totalRewards);
        winnersSet = true;
    }

    function withdrawStakeAndRewards() external {
        User storage user = users[msg.sender];
        uint256 totalAmount = user.stake;

        require(totalAmount > 0, "No stake or rewards to withdraw");

        user.stake = 0;
        totalStake -= totalAmount;

        lendingPlatform.withdraw(address(usdc), totalAmount, address(this));

        require(usdc.transfer(msg.sender, totalAmount), "Transfer failed");

        emit StakeAndRewardsWithdrawn(currentWave, msg.sender, totalAmount);
    }

    function stakeUSDCOnBehalf(address beneficiary, uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(beneficiary != address(0), "Invalid beneficiary address");
        
        require(usdc.transferFrom(beneficiary, address(this), amount), "Transfer failed");
        

        lendingPlatform.deposit(address(usdc), amount, address(this), 0);

        users[beneficiary].stake += amount;
        totalStake += amount;

         emit SuppliedToLendingPlatform(currentWave, beneficiary, amount);
    }
}
