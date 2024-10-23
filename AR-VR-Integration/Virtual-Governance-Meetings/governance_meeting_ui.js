// governance_meeting_ui.js

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MeetingProtocol from './MeetingProtocol.json'; // ABI of the smart contract

const GovernanceMeetingUI = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMeetingId, setCurrentMeetingId] = useState(null);
    const [voteOption, setVoteOption] = useState('');

    useEffect(() => {
        const init = async () => {
            const web3Instance = new Web3(Web3.givenProvider || 'http://localhost:8545');
            const accounts = await web3Instance.eth.getAccounts();
            const networkId = await web3Instance.eth.net.getId();
            const deployedNetwork = MeetingProtocol.networks[networkId];
            const instance = new web3Instance.eth.Contract(
                MeetingProtocol.abi,
                deployedNetwork && deployedNetwork.address,
            );

            setWeb3(web3Instance);
            setAccount(accounts[0]);
            setContract(instance);
            loadMeetings(instance);
        };

        init();
    }, []);

    const loadMeetings = async (contract) => {
        const meetingCount = await contract.methods.getMeetingCount().call();
        const meetingList = [];
        for (let i = 0; i < meetingCount; i++) {
            const meeting = await contract.methods.meetings(i).call();
            meetingList.push(meeting);
        }
        setMeetings(meetingList);
        setLoading(false);
    };

    const joinMeeting = async (meetingId) => {
        await contract.methods.joinMeeting(meetingId).send({ from: account });
        loadMeetings(contract);
    };

    const castVote = async (meetingId) => {
        await contract.methods.castVote(meetingId, voteOption).send({ from: account });
        loadMeetings(contract);
    };

    return (
        <div>
            <h1>Virtual Governance Meetings</h1>
            <h2>Account: {account}</h2>
            {loading ? (
                <p>Loading meetings...</p>
            ) : (
                <ul>
                    {meetings.map((meeting, index) => (
                        <li key={index}>
                            <h3>{meeting.title}</h3>
                            <p>Agenda: {meeting.agenda}</p>
                            <button onClick={() => joinMeeting(index)}>Join Meeting</button>
                            <input
                                type="text"
                                placeholder="Vote Option"
                                value={voteOption}
                                onChange={(e) => setVoteOption(e.target.value)}
                            />
                            <button onClick={() => castVote(index)}>Cast Vote</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GovernanceMeetingUI;
