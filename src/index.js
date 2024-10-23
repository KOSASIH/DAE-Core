// Import necessary libraries
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Web3 from 'web3';
import { Token } from './contracts/Token.json';
import { Governance } from './contracts/Governance.json';
import { Marketplace } from './contracts/Marketplace.json';
import { Identity } from './contracts/Identity.json';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Initialize Web3
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

// Contract instances
const tokenContract = new web3.eth.Contract(Token.abi, process.env.TOKEN_CONTRACT_ADDRESS);
const governanceContract = new web3.eth.Contract(Governance.abi, process.env.GOVERNANCE_CONTRACT_ADDRESS);
const marketplaceContract = new web3.eth.Contract(Marketplace.abi, process.env.MARKETPLACE_CONTRACT_ADDRESS);
const identityContract = new web3.eth.Contract(Identity.abi, process.env.IDENTITY_CONTRACT_ADDRESS);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the DAE-Core Framework API');
});

// Example route to get token balance
app.get('/balance/:address', async (req, res) => {
    try {
        const balance = await tokenContract.methods.balanceOf(req.params.address).call();
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching balance' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
