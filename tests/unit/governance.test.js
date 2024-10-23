import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Governance Contract', function () {
    let Governance;
    let governance;
    let owner;
    let addr1;

    beforeEach(async function () {
        Governance = await ethers.getContractFactory('Governance');
        [owner, addr1] = await ethers.getSigners();
        governance = await Governance.deploy();
        await governance.deployed();
    });

    it('Should create a proposal', async function () {
        await governance.createProposal('Proposal 1', 'Description of Proposal 1');
        const proposal = await governance.proposals(0);
        expect(proposal.title).to.equal('Proposal 1');
        expect(proposal.description).to.equal('Description of Proposal 1');
    });

    it('Should allow voting on a proposal', async function () {
        await governance.createProposal('Proposal 2', 'Description of Proposal 2');
        await governance.vote(0, true);
        const proposal = await governance.proposals(0);
        expect(proposal.voteCount).to.equal(1);
    });

    it('Should not allow voting on a non-existent proposal', async function () {
        await expect(governance.vote(999, true)).to.be.revertedWith('Proposal does not exist');
    });
});
