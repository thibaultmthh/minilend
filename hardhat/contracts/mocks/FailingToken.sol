// contracts/mocks/FailingToken.sol
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FailingToken is ERC20 {
    constructor() ERC20("Failing", "FAIL") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        return false;
    }
}