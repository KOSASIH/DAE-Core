import { ethers } from 'hardhat';

async function main() {
    const [deployer] = await ethers.getSigners();

    // Deploy the Token and Marketplace contracts
    const Token = await ethers.getContractFactory('Token');
    const Marketplace = await ethers.getContractFactory('Marketplace');

    const token = await Token.deploy();
    await token.deployed();
    console.log(`Token deployed to: ${token.address}`);

    const marketplace = await Marketplace.deploy(token.address);
    await marketplace.deployed();
    console.log(`Marketplace deployed to: ${marketplace.address}`);

    // Mint tokens to the deployer
    const initialSupply = ethers.utils.parseUnits('1000', 18);
    await token.mint(deployer.address, initialSupply);
    console.log(`Minted ${initialSupply.toString()} tokens to ${deployer.address}`);

    // List an item for sale
    await token.approve(marketplace.address, 100);
    await marketplace.listItem('Cool Item', 100);
    console.log('Listed "Cool Item" for sale at 100 tokens.');

    // Purchase the item
    await marketplace.purchaseItem(0);
    console.log('Purchased "Cool Item".');
}

// Execute the marketplace example
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
