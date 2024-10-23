// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AdaptiveToken is ERC20, Ownable {
    uint256 public maxSupply;
    uint256 public minSupply;
    uint256 public targetSupply;

    event SupplyAdjusted(uint256 newSupply);

    constructor(string memory name, string memory symbol, uint256 initialSupply, uint256 _maxSupply, uint256 _minSupply) ERC20(name, symbol) {
        require(initialSupply <= _maxSupply, "Initial supply exceeds max supply");
        _mint(msg.sender, initialSupply);
        maxSupply = _maxSupply;
        minSupply = _minSupply;
        targetSupply = initialSupply;
    }

    function adjustSupply(uint256 newSupply) external onlyOwner {
        require(newSupply <= maxSupply && newSupply >= minSupply, "New supply out of bounds");
        uint256 currentSupply = totalSupply();
        if (newSupply > currentSupply) {
            _mint(msg.sender, newSupply - currentSupply);
        } else if (newSupply < currentSupply) {
            _burn(msg.sender, currentSupply - newSupply);
        }
        targetSupply = newSupply;
        emit SupplyAdjusted(newSupply);
    }

    function getCurrentSupply() external view returns (uint256) {
        return totalSupply();
    }
}
