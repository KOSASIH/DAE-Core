// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReputationBasedGovernance {
    struct Proposal {
        string description;
        uint256 voteCount;
        mapping(address => uint256) votes; // user => vote weight
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public reputationScores; // user => reputation score
    uint256 public proposalCount;

    event ProposalCreated(uint256 proposalId, string description);
    event Voted(address indexed voter, uint256 proposalId, uint256 weight);

    function createProposal(string memory description) public {
        proposalCount++;
        proposals[proposalCount] = Proposal(description, 0);
        emit ProposalCreated(proposalCount, description);
    }

    function vote(uint256 proposalId) public {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal ID");
        require(reputationScores[msg.sender] > 0, "No reputation to vote");

        uint256 weight = reputationScores[msg.sender];
        proposals[proposalId].votes[msg.sender] += weight;
        proposals[proposalId].voteCount += weight;

        emit Voted(msg.sender, proposalId, weight);
    }

    function setReputation(address user, uint256 score) public {
        // Only the contract owner or a designated authority should be able to set reputation
        reputationScores[user] = score;
    }

    function getProposal(uint256 proposalId) public view returns (string memory description, uint256 voteCount) {
        Proposal storage proposal = proposals[proposalId];
        return (proposal.description, proposal.voteCount);
    }

    function getReputation(address user) public view returns (uint256) {
        return reputationScores[user];
    }
}
