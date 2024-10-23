// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GreenIncentives is Ownable {
    IERC20 public rewardToken;

    struct User {
        uint256 points;
        uint256 totalRewardsClaimed;
    }

    mapping(address => User) public users;

    event PointsEarned(address indexed user, uint256 points);
    event RewardsClaimed(address indexed user, uint256 amount);

    constructor(IERC20 _rewardToken) {
        rewardToken = _rewardToken;
    }

    function earnPoints(address user, uint256 points) external onlyOwner {
        require(points > 0, "Points must be greater than zero");
        users[user].points += points;
        emit PointsEarned(user, points);
    }

    function claimRewards(uint256 amount) external {
        require(users[msg.sender].points >= amount, "Not enough points to claim rewards");
        users[msg.sender].points -= amount;
        users[msg.sender].totalRewardsClaimed += amount;

        rewardToken.transfer(msg.sender, amount);
        emit RewardsClaimed(msg.sender, amount);
    }

    function getUser Info(address user) external view returns (uint256 points, uint256 totalRewardsClaimed) {
        User memory userInfo = users[user];
        return (userInfo.points, userInfo.totalRewardsClaimed);
    }
}
