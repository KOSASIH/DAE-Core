// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ReputationScoring is Ownable {
    struct Reputation {
        uint256 score;
        uint256 totalRatings;
    }

    mapping(address => Reputation) private reputations;

    event ReputationUpdated(address indexed user, uint256 newScore);

    function rateUser (address user, uint256 rating) public {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        Reputation storage userReputation = reputations[user];

        // Update the reputation score
        userReputation.score = (userReputation.score * userReputation.totalRatings + rating) / (userReputation.totalRatings + 1);
        userReputation.totalRatings += 1;

        emit ReputationUpdated(user, userReputation.score);
    }

    function getReputation(address user) public view returns (uint256 score, uint256 totalRatings) {
        Reputation memory userReputation = reputations[user];
        return (userReputation.score, userReputation.totalRatings);
    }
}
