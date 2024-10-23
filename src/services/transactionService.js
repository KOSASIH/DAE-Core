import Web3 from 'web3';
import { Token } from '../contracts/Token.json';

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const tokenContract = new web3.eth.Contract(Token.abi, process.env.TOKEN_CONTRACT_ADDRESS);

/**
 * Handles transactions related to the DAE token.
 */
class TransactionService {
    /**
     * Transfers tokens from one address to another.
     * @param {string} from - The address to transfer tokens from.
     * @param {string} to - The address to transfer tokens to.
     * @param {number} amount - The amount of tokens to transfer.
     * @param {string} privateKey - The private key of the sender.
     * @returns {Promise<string>} - The transaction hash.
     */
    async transferTokens(from, to, amount, privateKey) {
        const nonce = await web3.eth.getTransactionCount(from);
        const gasPrice = await web3.eth.getGasPrice();

        const tx = {
            from,
            to: process.env.TOKEN_CONTRACT_ADDRESS,
            value: '0x0',
            gas: 2000000,
            gasPrice,
            nonce,
            data: tokenContract.methods.transfer(to, amount).encodeABI(),
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt.transactionHash;
    }
}

export default new TransactionService();
