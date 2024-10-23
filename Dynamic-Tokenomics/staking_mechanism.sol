// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingMechanism is Ownable {
    IERC20 public token;
    uint256 public rewardRate; // Reward rate per second
    uint256 public totalStaked;

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 rewards;
    }

    mapping(address => Stake) public stakes;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);

    constructor(IERC20 _token, uint256 _rewardRate) {
        token = _token;
        rewardRate = _rewardRate;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        token.transferFrom(msg.sender, address(this), amount);
        
        Stake storage userStake = stakes[msg.sender];
        userStake.amount += amount;
        userStake.startTime = block.timestamp;

        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount >= amount, "Insufficient staked amount");

        claimRewards(); // Claim rewards before unstaking

        userStake.amount -= amount;
        totalStaked -= amount;
        token.transfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    function claimRewards() public {
        Stake storage userStake = stakes[msg.sender];
        uint256 rewards = calculateRewards(msg.sender);
        require(rewards > 0, "No rewards to claim");

        userStake.rewards = 0; // Reset rewards
        token.transfer(msg.sender, rewards);

        emit RewardsClaimed(msg.sender, rewards);
    }

    function calculateRewards(address user) public view returns (uint256) {
        Stake storage userStake = stakes[user];
        uint256 stakedDuration = block.timestamp - userStake.startTime;
        return (userStake.amount * rewardRate * stakedDuration) / 1e18; // Adjust for precision
    }

    function getStakeInfo(address user) external view returns (uint256 amount, uint256 rewards) {
        Stake storage userStake = stakes[user];
        return (userStake.amount, calculateRewards(user));
    }
}
