//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract CommunityPowerToken is ERC20Upgradeable {
    function initialize() public initializer {
        __ERC20_init("Community Power Token", "XYZ");
        // 100 MILLION
        _mint(msg.sender, 100000000 * 10**18);
    }
}
