// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is Ownable {
    struct Item {
        uint256 id;
        string name;
        uint256 price;
        address seller;
        bool sold;
    }

    Item[] public items;
    IERC20 public token;

    event ItemListed(uint256 itemId, string name, uint256 price, address seller);
    event ItemSold(uint256 itemId, address buyer);

    constructor(IERC20 _token) {
        token = _token;
    }

    function listItem(string memory name, uint256 price) external {
        uint256 itemId = items.length;
        items.push(Item(itemId, name, price, msg.sender, false));
        emit ItemListed(itemId, name, price, msg.sender);
    }

    function buyItem(uint256 itemId) external {
        Item storage item = items[itemId];
        require(!item.sold, "Item already sold");
        require(token.transferFrom(msg.sender, item.seller, item.price), "Payment failed");
        item.sold = true;
        emit ItemSold(itemId, msg.sender);
    }
}
