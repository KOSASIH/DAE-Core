// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract IdentityManagement is Ownable {
    struct Identity {
        string name;
        string email;
        string publicKey; // Public key for cryptographic operations
        bool exists;
    }

    mapping(address => Identity) private identities;

    event IdentityCreated(address indexed user, string name, string email, string publicKey);
    event IdentityUpdated(address indexed user, string name, string email, string publicKey);

    function createIdentity(string memory name, string memory email, string memory publicKey) public {
        require(!identities[msg.sender].exists, "Identity already exists");
        identities[msg.sender] = Identity(name, email, publicKey, true);
        emit IdentityCreated(msg.sender, name, email, publicKey);
    }

    function updateIdentity(string memory name, string memory email, string memory publicKey) public {
        require(identities[msg.sender].exists, "Identity does not exist");
        identities[msg.sender] = Identity(name, email, publicKey, true);
        emit IdentityUpdated(msg.sender, name, email, publicKey);
    }

    function getIdentity(address user) public view returns (string memory name, string memory email, string memory publicKey) {
        require(identities[user].exists, "Identity does not exist");
        Identity memory identity = identities[user];
        return (identity.name, identity.email, identity.publicKey);
    }
}
