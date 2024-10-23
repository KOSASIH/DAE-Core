// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetManagement is Ownable {
    struct Asset {
        string name;
        uint256 price; // Price in wei
        address owner;
    }

    Asset[] public assets;

    event AssetCreated(uint256 indexed assetId, string name, uint256 price, address indexed owner);
    event AssetPurchased(uint256 indexed assetId, address indexed buyer);

    function createAsset(string memory name, uint256 price) external onlyOwner {
        require(price > 0, "Price must be greater than zero");
        assets.push(Asset(name, price, msg.sender));
        emit AssetCreated(assets.length - 1, name, price, msg.sender);
    }

    function buyAsset(uint256 assetId) external payable {
        require(assetId < assets.length, "Asset does not exist");
        Asset storage asset = assets[assetId];
        require(msg.value >= asset.price, "Insufficient funds");
        require(asset.owner != msg.sender, "Cannot buy your own asset");

        address previousOwner = asset.owner;
        asset.owner = msg.sender;

        payable(previousOwner).transfer(msg.value);
        emit AssetPurchased(assetId, msg.sender);
    }

    function getAssetCount() external view returns (uint256) {
        return assets.length;
    }

    function getAsset(uint256 assetId) external view returns (string memory name, uint256 price, address owner) {
        require(assetId < assets.length, "Asset does not exist");
        Asset memory asset = assets[assetId];
        return (asset.name, asset.price, asset.owner);
    }
}
