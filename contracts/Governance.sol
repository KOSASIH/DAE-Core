// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Governance is Ownable {
    struct Proposal {
        string title;
        string description;
        uint256 voteCount;
        mapping(address => bool) voters;
        bool executed;
    }

    Proposal[] public proposals;

    event ProposalCreated(uint256 proposalId, string title);
    event Voted(uint256 proposalId, address voter);
    event ProposalExecuted(uint256 proposalId);

    function createProposal(string memory title, string memory description) external onlyOwner {
        Proposal storage newProposal = proposals.push();
        newProposal.title = title;
        newProposal.description = description;
        emit ProposalCreated(proposals.length - 1, title);
    }

    function vote(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.voters[msg.sender], "Already voted");
        proposal.voters[msg.sender] = true;
        proposal.voteCount++;
        emit Voted(proposalId, msg.sender);
    }

    function executeProposal(uint256 proposalId) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(proposal.voteCount > 0, "No votes to execute");
        proposal.executed = true;
        emit ProposalExecuted(proposalId);
        // Logic to execute the proposal goes here
    }
}
