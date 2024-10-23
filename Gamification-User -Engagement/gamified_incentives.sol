// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GamifiedIncentives is Ownable {
    IERC20 public rewardToken;

    struct User {
        uint256 points;
        uint256 level;
        uint256 totalRewardsClaimed;
    }

    mapping(address => User) public users;

    event PointsEarned(address indexed user, uint256 points);
    event RewardsClaimed(address indexed user, uint256 amount);

    constructor(IERC20 _rewardToken) {
        rewardToken = _rewardToken;
    }

    function earnPoints(address user, uint256 points) external onlyOwner {
        users[user].points += points;
        users[user].level = calculateLevel(users[user].points);
        emit PointsEarned(user, points);
    }

    function claimRewards(uint256 amount) external {
        require(users[msg.sender].points >= amount, "Not enough points to claim rewards");
        users[msg.sender].points -= amount;
        users[msg.sender].totalRewardsClaimed += amount;

        rewardToken.transfer(msg.sender, amount);
        emit RewardsClaimed(msg.sender, amount);
    }

    function calculateLevel(uint256 points) internal pure returns (uint256) {
        return points / 100; // Example: 1 level for every 100 points
    }

    function getUser Info(address user) external view returns (uint256 points, uint256 level, uint256 totalRewardsClaimed) {
        User memory userInfo = users[user];
        return (userInfo.points, userInfo.level, userInfo.totalRewardsClaimed);
    }
}
