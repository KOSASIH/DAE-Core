// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConfidentialTransactions {
    struct Transaction {
        address sender;
        bytes32 commitment; // Commitment to the amount
        uint256 nonce; // Nonce to ensure uniqueness
    }

    mapping(uint256 => Transaction) public transactions; // Transaction ID => Transaction
    uint256 public transactionCount;

    event TransactionCreated(uint256 indexed transactionId, address indexed sender, bytes32 commitment);

    function createTransaction(bytes32 commitment, uint256 nonce) public {
        transactionCount++;
        transactions[transactionCount] = Transaction(msg.sender, commitment, nonce);
        emit TransactionCreated(transactionCount, msg.sender, commitment);
    }

    function getTransaction(uint256 transactionId) public view returns (address sender, bytes32 commitment, uint256 nonce) {
        Transaction memory txn = transactions[transactionId];
        return (txn.sender, txn.commitment, txn.nonce);
    }
}
