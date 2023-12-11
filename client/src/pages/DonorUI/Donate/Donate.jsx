import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Donate.css';
const Donate = () => {
    // State to store user's eligibility to donate
    const [isEligible, setIsEligible] = useState(false);
    const [donationHistory, setDonationHistory] = useState([]);
    const [newDonation, setNewDonation] = useState('');

    useEffect(() => {
        checkEligibility();
        fetchDonationHistory();
    }, []);

    const checkEligibility = async () => {
        try {
            const response = await Axios.get('http://localhost:2121/getUnCuredInfections', {
                withCredentials: true
            });
            setIsEligible(response.data.length === 0);
        } catch (error) {
            console.error('Error checking eligibility:', error);
        }
    };

    const fetchDonationHistory = async () => {
        try {
            const response = await Axios.get('http://localhost:2121/getAllRequests', {
                withCredentials: true
            });
            setDonationHistory(response.data);
        } catch (error) {
            console.error('Error fetching donation history:', error);
        }
    };

    const handleNewDonationChange = (e) => {
        setNewDonation(e.target.value);
    };

    const submitDonationRequest = async () => {
        try {
            await Axios.post('http://localhost:2121/createRequest', {
                donationDetails: newDonation
            }, {
                withCredentials: true
            });
            setNewDonation('');
            fetchDonationHistory();
        } catch (error) {
            console.error('Error submitting donation request:', error);
        }
    };

    return (
        <div>
            <h1>Donate</h1>
            {isEligible ? (
                <>
                    <h2>Create a New Donation Request</h2>
                    <textarea value={newDonation} onChange={handleNewDonationChange}></textarea>
                    <button onClick={submitDonationRequest}>Submit Request</button>
                </>
            ) : (
                <p>You are not eligible to donate at this time.</p>
            )}
            <h2>Past Donation Requests</h2>
            {donationHistory.length > 0 ? (
                <ul>
                    {donationHistory.map((request) => (
                        <li key={request.id}>
                            <div>Request: {request.details}</div>
                            <div>Status: {request.status}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No past donation requests.</p>
            )}
        </div>
    );
};

export default Donate;