// community_interactions.js

const Web3 = require('web3');
const UserProfilesABI = require('./User ProfilesABI.json'); // ABI of the UserProfiles contract
const userProfilesAddress = '0xYourUser ProfilesContractAddress'; // Replace with your deployed contract address

const web3 = new Web3('http://localhost:8545'); // Connect to your Ethereum node
const userProfilesContract = new web3.eth.Contract(UserProfilesABI, userProfilesAddress);

async function createProfile(username, bio, avatarUrl, userAddress) {
    try {
        await userProfilesContract.methods.createProfile(username, bio, avatarUrl).send({ from: userAddress });
        console.log(`Profile created for ${username}`);
    } catch (error) {
        console.error(`Error creating profile: ${error}`);
    }
}

async function updateProfile(username, bio, avatarUrl, userAddress) {
    try {
        await userProfilesContract.methods.updateProfile(username, bio, avatarUrl).send({ from: userAddress });
        console.log(`Profile updated for ${username}`);
    } catch (error) {
        console.error(`Error updating profile: ${error}`);
    }
}

async function getProfile(userAddress) {
    try {
        const profile = await userProfilesContract.methods.getProfile(userAddress).call();
        console.log(`Profile for ${userAddress}: ${profile.username}, ${profile.bio}, ${profile.avatarUrl}`);
    } catch (error) {
        console.error(`Error getting profile: ${error}`);
    }
}

// Simulate community interactions
setInterval(() => {
    const userAddress = '0xYourUser Address'; // Replace with your user address
    const username = 'John Doe';
    const bio = 'Software engineer and blockchain enthusiast';
    const avatarUrl = 'https://example.com/avatar.jpg';

    createProfile(username, bio, avatarUrl, userAddress);
    updateProfile(username, bio, avatarUrl, userAddress);
    getProfile(userAddress);
}, 5000); // Interact with the community every 5 seconds
