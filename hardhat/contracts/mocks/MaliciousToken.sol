// contracts/mocks/MaliciousToken.sol
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MaliciousToken is ERC20 {
    address public immutable target;
    uint256 public attackCount;

    constructor(address _target) ERC20("Malicious", "MAL") {
        target = _target;
        _mint(msg.sender, 1000 ether);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        if (attackCount < 3) {
            attackCount++;
            (bool success,) = target.call(
                abi.encodeWithSignature("executeAirdrop(uint256,uint256)", 0, 1)
            );
            require(success, "Reentrant call failed");
        }
        return super.transfer(to, amount);
    }
}