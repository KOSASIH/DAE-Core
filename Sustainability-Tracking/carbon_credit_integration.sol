// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CarbonCreditIntegration is Ownable {
    IERC20 public carbonCreditToken;

    struct User {
        uint256 credits;
        uint256 totalCreditsPurchased;
        uint256 totalCreditsSold;
    }

    mapping(address => User) public users;

    event CreditsPurchased(address indexed user, uint256 amount);
    event CreditsSold(address indexed user, uint256 amount);

    constructor(IERC20 _carbonCreditToken) {
        carbonCreditToken = _carbonCreditToken;
    }

    function purchaseCredits(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        carbonCreditToken.transferFrom(msg.sender, address(this), amount);
        users[msg.sender].credits += amount;
        users[msg.sender].totalCreditsPurchased += amount;
        emit CreditsPurchased(msg.sender, amount);
    }

    function sellCredits(uint256 amount) external {
        require(users[msg.sender].credits >= amount, "Not enough credits to sell");
        users[msg.sender].credits -= amount;
        carbonCreditToken.transfer(msg.sender, amount);
        users[msg.sender].totalCreditsSold += amount;
        emit CreditsSold(msg.sender, amount);
    }

    function getUser Credits(address user) external view returns (uint256 credits, uint256 totalPurchased, uint256 totalSold) {
        User memory userInfo = users[user];
        return (userInfo.credits, userInfo.totalCreditsPurchased, userInfo.totalCreditsSold);
    }
}
