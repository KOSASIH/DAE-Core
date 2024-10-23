import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Identity Contract', function () {
    let Identity;
    let identity;
    let owner;

    beforeEach(async function () {
        Identity = await ethers.getContractFactory('Identity');
        [owner] = await ethers.getSigners();
        identity = await Identity.deploy();
        await identity.deployed();
    });

    it('Should register a new identity', async function () {
        await identity.register('0x1234567890abcdef1234567890abcdef12345678', 'User 1');
        const user = await identity.getIdentity('0x1234567890abcdef1234567890abcdef12345678');
        expect(user.name).to.equal('User 1');
    });

    it('Should not allow duplicate identity registration', async function () {
        await identity.register('0x1234567890abcdef1234567890abcdef12345678', 'User 1');
        await expect(identity.register('0x1234567890abcdef1234567890abcdef12345678', 'User 2')).to.be.revertedWith('Identity already exists');
    });
});
