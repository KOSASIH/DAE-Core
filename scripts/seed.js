import { ethers } from 'hardhat';

async function main() {
    const [deployer] = await ethers.getSigners();

    const tokenAddress = '0xTokenAddress'; // Replace with actual token address
    const token = await ethers.getContractAt('Token', tokenAddress);

    // Seed initial token supply
    const initialSupply = ethers.utils.parseUnits('1000000', 18); // 1 million tokens
    await token.mint(deployer.address, initialSupply);
    console.log(`Minted ${initialSupply.toString()} tokens to ${deployer.address}`);

    const governanceAddress = '0xGovernanceAddress'; // Replace with actual governance address
    const governance = await ethers.getContractAt('Governance', governanceAddress);

    // Create initial proposals
    await governance.createProposal('Initial Proposal', 'This is the first proposal.');
    console.log('Initial proposal created.');

    const identityAddress = '0xIdentityAddress'; // Replace with actual identity address
    const identity = await ethers.getContractAt('Identity', identityAddress);

    // Register initial identities
    await identity.register(deployer.address, 'Admin');
    console.log(`Registered identity for ${deployer.address} as Admin.`);
}

// Execute the seeding script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
