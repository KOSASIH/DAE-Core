// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    struct User {
        string name;
        string email;
        bool exists;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed userAddress, string name, string email);

    function register(string memory name, string memory email) external {
        require(!users[msg.sender].exists, "User  already registered");
        users[msg.sender] = User(name, email, true);
        emit UserRegistered(msg.sender, name, email);
    }

    function getUser (address userAddress ) external view returns (string memory, string memory) {
        User storage user = users[userAddress];
        require(user.exists, "User not registered");
        return (user.name, user.email);
    }
}
