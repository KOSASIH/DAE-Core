// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract UserProfiles is Ownable {
    struct Profile {
        string username;
        string bio;
        string avatarUrl;
        bool exists;
    }

    mapping(address => Profile) public profiles;

    event ProfileCreated(address indexed user, string username, string bio, string avatarUrl);
    event ProfileUpdated(address indexed user, string username, string bio, string avatarUrl);

    function createProfile(string memory username, string memory bio, string memory avatarUrl) public {
        require(!profiles[msg.sender].exists, "Profile already exists");
        profiles[msg.sender] = Profile(username, bio, avatarUrl, true);
        emit ProfileCreated(msg.sender, username, bio, avatarUrl);
    }

    function updateProfile(string memory username, string memory bio, string memory avatarUrl) public {
        require(profiles[msg.sender].exists, "Profile does not exist");
        profiles[msg.sender] = Profile(username, bio, avatarUrl, true);
        emit ProfileUpdated(msg.sender, username, bio, avatarUrl);
    }

    function getProfile(address user) public view returns (string memory username, string memory bio, string memory avatarUrl) {
        require(profiles[user].exists, "Profile does not exist");
        Profile memory profile = profiles[user];
        return (profile.username, profile.bio, profile.avatarUrl);
    }
}
