// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RiskPoolingMechanism is Ownable {
    struct Pool {
        uint256 totalContributions;
        mapping(address => uint256) contributions;
    }

    Pool public riskPool;

    event ContributionMade(address indexed contributor, uint256 amount);
    event PayoutMade(address indexed insured, uint256 amount);

    function contribute() external payable {
        require(msg.value > 0, "Contribution must be greater than zero");
        riskPool.totalContributions += msg.value;
        riskPool.contributions[msg.sender] += msg.value;
        emit ContributionMade(msg.sender, msg.value);
    }

    function payout(address payable insured, uint256 amount) external onlyOwner {
        require(amount <= riskPool.totalContributions, "Insufficient funds in the pool");
        riskPool.totalContributions -= amount;
        insured.transfer(amount);
        emit PayoutMade(insured, amount);
    }

    function getContribution(address contributor) external view returns (uint256) {
        return riskPool.contributions[contributor];
    }

    receive() external payable {}
}
