import { ethers } from 'hardhat';

async function main() {
    const [deployer] = await ethers.getSigners();

    // Deploy the Governance contract
    const Governance = await ethers.getContractFactory('Governance');
    const governance = await Governance.deploy();
    await governance.deployed();
    console.log(`Governance contract deployed to: ${governance.address}`);

    // Create a proposal
    const proposalDescription = 'Should we implement feature X?';
    await governance.createProposal(proposalDescription);
    console.log(`Created proposal: "${proposalDescription}"`);

    // Vote on the proposal
    await governance.vote(0, true); // Vote 'yes' on the first proposal
    console.log('Voted "yes" on the proposal.');

    // Check proposal status
    const proposal = await governance.proposals(0);
    console.log(`Proposal: ${proposal.description}`);
    console.log(`Votes For: ${proposal.votesFor}, Votes Against: ${proposal.votesAgainst}`);
}

// Execute the governance voting example
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
