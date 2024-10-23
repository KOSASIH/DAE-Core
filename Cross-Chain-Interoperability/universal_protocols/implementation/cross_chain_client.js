// cross_chain_client.js

const Web3 = require('web3');
const bridgeABI = require('./CrossChainBridgeABI.json'); // ABI of the CrossChainBridge contract
const bridgeAddress = '0xYourBridgeContractAddress'; // Replace with your deployed contract address

const web3 = new Web3('https://your.ethereum.node'); // Replace with your Ethereum node URL
const bridgeContract = new web3.eth.Contract(bridgeABI, bridgeAddress);

async function lockAssets(amount, targetChain, userAddress) {
    const accounts = await web3.eth.getAccounts();
    const tx = await bridgeContract.methods.lockAssets(amount, targetChain).send({ from: userAddress });
    console.log('Transaction successful:', tx);
}

async function unlockAssets(userAddress, amount) {
    const tx = await bridgeContract.methods.unlockAssets(userAddress, amount).send({ from: userAddress });
    console.log('Unlock transaction successful:', tx );
}

// Example usage:
lockAssets(10, 'Binance Smart Chain', '0xYourUserAddress');
unlockAssets('0xYourUserAddress', 5);
