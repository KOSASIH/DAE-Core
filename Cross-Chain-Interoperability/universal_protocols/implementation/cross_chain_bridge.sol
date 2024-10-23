// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrossChainBridge {
    mapping(address => uint256) public lockedAssets; // User => Amount locked
    event AssetsLocked(address indexed user, uint256 amount, string targetChain);
    event AssetsUnlocked(address indexed user, uint256 amount);

    function lockAssets(uint256 amount, string memory targetChain) public {
        require(amount > 0, "Amount must be greater than zero");
        // Logic to transfer assets to this contract would go here
        lockedAssets[msg.sender] += amount;
        emit AssetsLocked(msg.sender, amount, targetChain);
    }

    function unlockAssets(address user, uint256 amount) public {
        require(lockedAssets[user] >= amount, "Insufficient locked assets");
        lockedAssets[user] -= amount;
        // Logic to transfer assets back to the user would go here
        emit AssetsUnlocked(user, amount);
    }

    function getLockedAssets(address user) public view returns (uint256) {
        return lockedAssets[user];
    }
}
