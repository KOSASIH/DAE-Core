import { Identity } from '../contracts/Identity.json';
import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const identityContract = new web3.eth.Contract(Identity.abi, process.env.IDENTITY_CONTRACT_ADDRESS);

/**
 * Manages identity verification processes.
 */
class IdentityService {
    /**
     * Registers a new user with their name and email.
     * @param {string} name - The name of the user.
     * @param {string} email - The email of the user.
     * @param {string} userAddress - The address of the user.
     * @param {string} privateKey - The private key of the user.
     * @returns {Promise<string>} - The transaction hash.
     */
    async registerUser (name, email, userAddress, privateKey) {
        const nonce = await web3.eth.getTransactionCount(userAddress);
        const gasPrice = await web3.eth.getGasPrice();

        const tx = {
            from: userAddress,
            to: process.env.IDENTITY_CONTRACT_ADDRESS,
            value: '0x0',
            gas: 2000000,
            gasPrice,
            nonce,
            data: identityContract.methods.register(name, email).encodeABI(),
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt.transactionHash;
    }

    /**
     * Retrieves user information by address.
     * @param {string} userAddress - The address of the user.
     * @returns {Promise<Object>} - The user's name and email.
     */
    async getUser (userAddress) {
        return await identityContract.methods.getUser (userAddress).call();
    }
}

export default new IdentityService();
