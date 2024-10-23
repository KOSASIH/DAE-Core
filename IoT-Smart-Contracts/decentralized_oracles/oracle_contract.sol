// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OracleContract is Ownable {
    struct DataRequest {
        address requester;
        string dataType;
        uint256 requestId;
        bool fulfilled;
        string data;
    }

    mapping(uint256 => DataRequest) public requests;
    uint256 public requestCount;

    event DataRequested(uint256 indexed requestId, address indexed requester, string dataType);
    event DataFulfilled(uint256 indexed requestId, string data);

    function requestData(string memory dataType) public {
        requestCount++;
        requests[requestCount] = DataRequest(msg.sender, dataType, requestCount, false, "");
        emit DataRequested(requestCount, msg.sender, dataType);
    }

    function fulfillData(uint256 requestId, string memory data) public onlyOwner {
        DataRequest storage request = requests[requestId];
        require(!request.fulfilled, "Request already fulfilled");

        request.data = data;
        request.fulfilled = true;
        emit DataFulfilled(requestId, data);
    }

    function getData(uint256 requestId) public view returns (string memory) {
        require(requests[requestId].fulfilled, "Data not fulfilled");
        return requests[requestId].data;
    }
}
