// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract IoTTransactions is Ownable {
    struct Device {
        string deviceId;
        address owner;
        bool isActive;
    }

    mapping(string => Device) public devices;
    mapping(string => uint256) public deviceBalances;

    event DeviceRegistered(string indexed deviceId, address indexed owner);
    event DeviceActivated(string indexed deviceId);
    event DeviceDeactivated(string indexed deviceId);
    event PaymentReceived(string indexed deviceId, uint256 amount);

    function registerDevice(string memory deviceId) public {
        require(!devices[deviceId].isActive, "Device already registered");
        devices[deviceId] = Device(deviceId, msg.sender, true);
        emit DeviceRegistered(deviceId, msg.sender);
    }

    function activateDevice(string memory deviceId) public {
        require(msg.sender == devices[deviceId].owner, "Only owner can activate");
        devices[deviceId].isActive = true;
        emit DeviceActivated(deviceId);
    }

    function deactivateDevice(string memory deviceId) public {
        require(msg.sender == devices[deviceId].owner, "Only owner can deactivate");
        devices[deviceId].isActive = false;
        emit DeviceDeactivated(deviceId);
    }

    function makePayment(string memory deviceId) public payable {
        require(devices[deviceId].isActive, "Device is not active");
        require(msg.value > 0, "Payment must be greater than zero");

        deviceBalances[deviceId] += msg.value;
        emit PaymentReceived(deviceId, msg.value);
    }

    function withdrawFunds(string memory deviceId) public {
        require(msg.sender == devices[deviceId].owner, "Only owner can withdraw");
        uint256 balance = deviceBalances[deviceId];
        require(balance > 0, "No funds to withdraw");

        deviceBalances[deviceId] = 0;
        payable(msg.sender).transfer(balance);
    }
}
