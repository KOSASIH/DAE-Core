// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QuadraticVoting {
    struct Proposal {
        string description;
        uint256 voteCount;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(address => mapping(uint256 => uint256)) public votes; // user => proposalId => votes
    uint256 public proposalCount;

    event ProposalCreated(uint256 proposalId, string description);
    event Voted(address indexed voter, uint256 proposalId, uint256 votes);

    function createProposal(string memory description) public {
        proposalCount++;
        proposals[proposalCount] = Proposal(description, 0);
        emit ProposalCreated(proposalCount, description);
    }

    function vote(uint256 proposalId, uint256 voteAmount) public {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal ID");
        require(voteAmount > 0, "Must vote with a positive amount");

        uint256 cost = calculateCost(voteAmount);
        require(msg.sender.balance >= cost, "Insufficient balance to vote");

        // Update votes
        votes[msg.sender][proposalId] += voteAmount;
        proposals[proposalId].voteCount += voteAmount;

        emit Voted(msg.sender, proposalId, voteAmount);
    }

    function calculateCost(uint256 voteAmount) internal pure returns (uint256) {
        return (voteAmount * voteAmount) / 2; // Quadratic cost
    }

    function getProposal(uint256 proposalId) public view returns (string memory description, uint256 voteCount) {
        Proposal memory proposal = proposals[proposalId];
        return (proposal.description, proposal.voteCount);
    }
}
