import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Axios from 'axios';

const DonorRequests = () => {
    const [donationRequests, setDonationRequests] = useState([]);

    useEffect(() => {
        Axios({
            method: 'GET',
            url: 'http://localhost:2121/nurse/getWaitingRequestes',
            withCredentials: true,
        })
            .then((res) => {
                setDonationRequests(res.data.donationRequestes);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleAccept = (requestId) => {
        // Placeholder for accept logic
        console.log('Accepted request:', requestId);
    };

    const handleDecline = (requestId) => {
        // Placeholder for decline logic
        console.log('Declined request:', requestId);
    };

    return (
        <div className="dashboard-container">
            <div className="total-requests">Total Donation Requests: {donationRequests.length}</div>

            <div className="donation-requests-list">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Request Date</th>
                            <th>Donor ID</th>
                            <th>Blood Bag ID</th>
                            <th>Operation Status</th>
                            <th>Request Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donationRequests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{new Date(request.requestDate).toLocaleString()}</td>
                                <td>{request.donorId}</td>
                                <td>{request.bloodBagId || 'N/A'}</td>
                                <td>{request.operationStatus || 'Not started'}</td>
                                <td>{request.requestStatus}</td>
                                <td>{request.updateDate ? new Date(request.updateDate).toLocaleString() : 'N/A'}</td>
                                <td>
                                    <button onClick={() => handleAccept(request.id)}>Accept</button>
                                    <button onClick={() => handleDecline(request.id)}>Decline</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DonorRequests;