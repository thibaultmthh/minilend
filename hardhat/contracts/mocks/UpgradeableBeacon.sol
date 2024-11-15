// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

contract UpgradeableBeaconMock is UpgradeableBeacon {
    constructor(address implementation_, address owner_) UpgradeableBeacon(implementation_, owner_) {
        _transferOwnership(owner_);
    }
}
