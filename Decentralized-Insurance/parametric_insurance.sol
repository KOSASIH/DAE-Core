// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ParametricInsurance is Ownable {
    struct Policy {
        address insured;
        uint256 premium;
        uint256 payout;
        bool isActive;
        uint256 triggerCondition; // e.g., rainfall amount
    }

    mapping(uint256 => Policy) public policies;
    uint256 public policyCount;

    event PolicyCreated(uint256 indexed policyId, address indexed insured, uint256 premium, uint256 payout);
    event PayoutExecuted(uint256 indexed policyId, address indexed insured, uint256 payout);

    function createPolicy(uint256 premium, uint256 payout, uint256 triggerCondition) external {
        require(premium > 0, "Premium must be greater than zero");
        require(payout > 0, "Payout must be greater than zero");

        policyCount++;
        policies[policyCount] = Policy(msg.sender, premium, payout, true, triggerCondition);
        emit PolicyCreated(policyCount, msg.sender, premium, payout);
    }

    function triggerPayout(uint256 policyId, uint256 actualCondition) external onlyOwner {
        Policy storage policy = policies[policyId];
        require(policy.isActive, "Policy is not active");
        require(actualCondition >= policy.triggerCondition, "Trigger condition not met");

        policy.isActive = false;
        payable(policy.insured).transfer(policy.payout);
        emit PayoutExecuted(policyId, policy.insured, policy.payout);
    }

    function getPolicy(uint256 policyId) external view returns (Policy memory) {
        return policies[policyId];
    }

    receive() external payable {}
}
