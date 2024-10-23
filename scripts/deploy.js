import { ethers } from 'hardhat';

async function main() {
    // Get the contract factories
    const Token = await ethers.getContractFactory('Token');
    const Governance = await ethers.getContractFactory('Governance');
    const Identity = await ethers.getContractFactory('Identity');
    const Marketplace = await ethers.getContractFactory('Marketplace');

    // Deploy the contracts
    const token = await Token.deploy();
    await token.deployed();
    console.log(`Token deployed to: ${token.address}`);

    const governance = await Governance.deploy();
    await governance.deployed();
    console.log(`Governance deployed to: ${governance.address}`);

    const identity = await Identity.deploy();
    await identity.deployed();
    console.log(`Identity deployed to: ${identity.address}`);

    const marketplace = await Marketplace.deploy(token.address);
    await marketplace.deployed();
    console.log(`Marketplace deployed to: ${marketplace.address}`);
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
