// data_feed.js

const Web3 = require('web3');
const OracleContractABI = require('./OracleContractABI.json'); // ABI of the OracleContract
const oracleAddress = '0xYourOracleContractAddress'; // Replace with your deployed contract address

const web3 = new Web3('http://localhost:8545'); // Connect to your Ethereum node
const oracleContract = new web3.eth.Contract(OracleContractABI, oracleAddress);

async function fulfillData(requestId, data) {
   try {
        await oracleContract.methods.fulfillData(requestId, data).send({ from: '0xYourOwnerAddress' }); // Replace with your owner address
        console.log(`Data fulfilled for request ${requestId}`);
    } catch (error) {
        console.error(`Error fulfilling data: ${error}`);
    }
}

// Simulate a data feed
setInterval(() => {
    const requestId = Math.floor(Math.random() * 100); // Generate a random request ID
    const data = `Random data for request ${requestId}`; // Generate random data
    fulfillData(requestId, data);
}, 5000); // Fulfill data every 5 seconds
