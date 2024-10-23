import { Governance } from '../contracts/Governance.json';
import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const governanceContract = new web3.eth.Contract(Governance.abi, process.env.GOVERNANCE_CONTRACT_ADDRESS);

/**
 * Manages governance processes such as proposal creation and voting.
 */
class GovernanceService {
    /**
     * Creates a new proposal.
     * @param {string} title - The title of the proposal.
     * @param {string} description - The description of the proposal.
     * @param {string} proposerAddress - The address of the proposer.
     * @param {string} privateKey - The private key of the proposer.
     * @returns {Promise<string>} - The proposal ID.
     */
    async createProposal (title, description, proposerAddress, privateKey) {
        const nonce = await web3.eth.getTransactionCount(proposerAddress);
        const gasPrice = await web3.eth.getGasPrice();

        const tx = {
            from: proposerAddress,
            to: process.env.GOVERNANCE_CONTRACT_ADDRESS,
            value: '0x0',
            gas: 2000000,
            gasPrice,
            nonce,
            data: governanceContract.methods.createProposal(title, description).encodeABI(),
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return await governanceContract.methods.getProposalCount().call();
    }

    /**
     * Casts a vote for a proposal.
     * @param {number} proposalId - The ID of the proposal.
     * @param {boolean} vote - The vote (true for yes, false for no).
     * @param {string} voterAddress - The address of the voter.
     * @param {string} privateKey - The private key of the voter.
     * @returns {Promise<string>} - The transaction hash.
     */
    async castVote (proposalId, vote, voterAddress, privateKey) {
        const nonce = await web3.eth.getTransactionCount(voterAddress);
        const gasPrice = await web3.eth.getGasPrice();

        const tx = {
            from: voterAddress,
            to: process.env.GOVERNANCE_CONTRACT_ADDRESS,
            value: '0x0',
            gas: 2000000,
            gasPrice,
            nonce,
            data: governanceContract.methods.castVote(proposalId, vote).encodeABI(),
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt.transactionHash;
    }
}

export default new GovernanceService();
