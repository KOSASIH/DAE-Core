import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Marketplace Integration Tests', function () {
    let Marketplace;
    let marketplace;
    let Token;
    let token;
    let owner;
    let addr1;

    beforeEach(async function () {
        Token = await ethers.getContractFactory('Token');
        Marketplace = await ethers.getContractFactory('Marketplace');
        [owner, addr1] = await ethers.getSigners();

        token = await Token.deploy();
        await token.deployed();

        marketplace = await Marketplace.deploy(token.address);
        await marketplace.deployed();

        // Mint tokens to addr1 for testing
        await token.mint(addr1.address, 1000);
    });

    it('Should list an item for sale', async function () {
        await token.connect(addr1).approve(marketplace.address, 100);
        await marketplace.connect(addr1).listItem('Item 1', 100);
        
        const item = await marketplace.items(0);
        expect(item.name).to.equal('Item 1');
        expect(item.price).to.equal(100);
        expect(item.seller).to.equal(addr1.address);
    });

    it('Should allow purchase of listed item', async function () {
        await token.connect(addr1).approve(marketplace.address, 100);
        await marketplace.connect(addr1).listItem('Item 2', 100);
        
        await marketplace.connect(owner).purchaseItem(0);
        
        const item = await marketplace.items(0);
        expect(item.buyer).to.equal(owner.address);
    });

    it('Should fail if item is not listed', async function () {
        await expect(marketplace.connect(owner).purchaseItem(999)).to.be.revertedWith('Item does not exist');
    });
});
