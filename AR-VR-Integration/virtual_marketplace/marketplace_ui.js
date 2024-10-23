// marketplace_ui.js

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import AssetManagement from './AssetManagement.json'; // ABI of the smart contract

const MarketplaceUI = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const web3Instance = new Web3(Web3.givenProvider || 'http://localhost:8545');
            const accounts = await web3Instance.eth.getAccounts();
            const networkId = await web3Instance.eth.net.getId();
            const deployedNetwork = AssetManagement.networks[networkId];
            const instance = new web3Instance.eth.Contract(
                AssetManagement.abi,
                deployedNetwork && deployedNetwork.address,
            );

            setWeb3(web3Instance);
            setAccount(accounts[0]);
            setContract(instance);
            loadAssets(instance);
        };

        init();
    }, []);

    const loadAssets = async (contract) => {
        const assetCount = await contract.methods.getAssetCount().call();
        const assetList = [];
        for (let i = 0; i < assetCount; i++) {
            const asset = await contract.methods.assets(i).call();
            assetList.push(asset);
        }
        setAssets(assetList);
        setLoading(false);
    };

    const buyAsset = async (assetId) => {
        await contract.methods.buyAsset(assetId).send({ from: account });
        loadAssets(contract);
    };

    return (
        <div>
            <h1>Virtual Marketplace</h1>
            <h2>Account: {account}</h2>
            {loading ? (
                <p>Loading assets...</p>
            ) : (
                <ul>
                    {assets.map((asset, index) => (
                        <li key={index}>
                            <h3>{asset.name}</h3>
                            <p>Price: {web3.utils.fromWei(asset.price, 'ether')} ETH</p>
                            <button onClick={() => buyAsset(index)}>Buy</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MarketplaceUI;
