// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MeetingProtocol is Ownable {
    struct Meeting {
        string title;
        string agenda;
        address[] participants;
        mapping(address => bool) hasVoted;
        mapping(string => uint256) votes; // Option => Vote Count
    }

    Meeting[] public meetings;

    event MeetingCreated(uint256 indexed meetingId, string title, string agenda);
    event ParticipantJoined(uint256 indexed meetingId, address indexed participant);
    event VoteCast(uint256 indexed meetingId, address indexed voter, string option);

    function createMeeting(string memory title, string memory agenda) external onlyOwner {
        meetings.push();
        Meeting storage newMeeting = meetings[meetings.length - 1];
        newMeeting.title = title;
        newMeeting.agenda = agenda;
        emit MeetingCreated(meetings.length - 1, title, agenda);
    }

    function joinMeeting(uint256 meetingId) external {
        require(meetingId < meetings.length, "Meeting does not exist");
        Meeting storage meeting = meetings[meetingId];
        require(!meeting.hasVoted[msg.sender], "You have already joined this meeting");
        meeting.participants.push(msg.sender);
        meeting.hasVoted[msg.sender] = true;
        emit ParticipantJoined(meetingId, msg.sender);
    }

    function castVote(uint256 meetingId, string memory option) external {
        require(meetingId < meetings.length, "Meeting does not exist");
        Meeting storage meeting = meetings[meetingId];
        require(meeting.hasVoted[msg.sender], "You have not joined this meeting");
        meeting.votes[option]++;
        emit VoteCast(meetingId, msg.sender, option);
    }

    function getMeetingCount() external view returns (uint256) {
        return meetings.length;
    }

    function getMeeting(uint256 meetingId) external view returns (string memory title, string memory agenda, address[] memory participants) {
        require(meetingId < meetings.length, "Meeting does not exist");
        Meeting memory meeting = meetings[meetingId];
        return (meeting.title, meeting.agenda, meeting.participants);
    }
}
