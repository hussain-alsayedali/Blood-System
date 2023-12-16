import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Axios from 'axios';

const InfectionRequests = () => {
    const [infectionRequests, setInfectionRequests] = useState([]);

    useEffect(() => {
        Axios({
            method: 'GET',
            url: 'http://localhost:2121/nurse/getAllRequestes',
            withCredentials: true,
        })
            .then((res) => {
                setInfectionRequests(res.data.infectionRequests);
                console.log(res.data.infectionRequests)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleAccept = (requestId, requesterType, requesterId) => {
        Axios({
            method: 'POST',
            url: 'http://localhost:2121/nurse/acceptInfectionRequest',
            data: {
                requestId,
                requesterType,
                requesterId
            },
            withCredentials: true,
        })
            .then((response) => {
                console.log('Infection request accepted:', response);
                setInfectionRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.id === requestId ? { ...request, requestStatus: 'accepted' } : request
                    )
                );
            })
            .catch((error) => {
                console.error('Error accepting infection request:', error);
            });
    };

    const handleDecline = (requestId) => {
        Axios({
            method: 'POST',
            url: 'http://localhost:2121/nurse/declineInfectionRequest',
            data: {
                requestId
            },
            withCredentials: true,
        })
            .then((response) => {
                console.log('Infection request declined:', response);
                setInfectionRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.id === requestId ? { ...request, requestStatus: 'rejected' } : request
                    )
                );
            })
            .catch((error) => {
                console.error('Error declining infection request:', error);
            });
    };

    return (
        <div className="dashboard-container">
            <div className="total-requests">Total Infection Requests: {infectionRequests.length}</div>

            <div className="infection-requests-list">
                <table>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Update Date</th>
                            <th>Requester Type</th>
                            <th>donor ID</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infectionRequests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{new Date(request.updateDate).toLocaleString()}</td>
                                <td>{request.requesterType}</td>
                                <td>{request.donorId}</td>
                                <td>{request.requestStatus}</td>
                                <td>
                                    <button onClick={() => handleAccept(request.id, request.requesterType, request.requesterId)}>Accept</button>
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

export default InfectionRequests;