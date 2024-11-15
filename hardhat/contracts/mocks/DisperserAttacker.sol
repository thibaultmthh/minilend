// contracts/mocks/DisperserAttacker.sol
pragma solidity ^0.8.27;

interface IDisperser {
    function executeAirdrop(uint256 airdropId, uint256 batchSize) external;
}

contract ReentrancyAttacker {
    IDisperser public immutable disperser;
    uint256 public attackCount;
    bool public attacking;

    constructor(address _disperser) {
        disperser = IDisperser(_disperser);
    }

    function attack(uint256 airdropId, uint256 batchSize) external {
        attacking = true;
        try disperser.executeAirdrop(airdropId, batchSize) {
            // Attack succeeded
        } catch {
            // Attack failed
        }
        attacking = false;
    }

    receive() external payable {
        if (attacking && attackCount < 3) {
            attackCount++;
            try disperser.executeAirdrop(0, 1) {
                // Reentrancy succeeded
            } catch {
                // Reentrancy failed
            }
        }
    }
}