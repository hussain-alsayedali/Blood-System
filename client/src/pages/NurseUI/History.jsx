import React, { useState, useEffect } from 'react';
import './History.css';

// Helper function to format dates
const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

// Function to fetch all requests from the API
const fetchAllRequests = async () => {
    try {
        const response = await fetch('http://localhost:2121/nurse/getAllRequestes');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    } catch (e) {
        console.error('Fetching requests failed:', e);
        throw e;
    }
};

const History = () => {
    const [requests, setRequests] = useState({
        receivingRequests: [],
        donationRequests: [],
        infectionRequests: [],
    });
    const [error, setError] = useState(null);
    const [showSections, setShowSections] = useState({
        receiving: true,
        donation: true,
        infection: true,
    });

    useEffect(() => {
        fetchAllRequests()
            .then(data => {
                setRequests({
                    receivingRequests: data.recivingRequestes || [],
                    donationRequests: data.donationRequestes || [],
                    infectionRequests: data.infectionRequests || [],
                });
            })
            .catch(e => {
                setError(e.toString());
            });
    }, []);

    const toggleSection = (section) => {
        setShowSections(prevState => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1 className="heading">History</h1>

            <div className="requests-section">
                <button className="toggle-btn" onClick={() => toggleSection('receiving')}>
                    Receiving Requests
                </button>
                {showSections.receiving && (
                    <ul className="list">
                        {requests.receivingRequests.map((request, index) => (
                            <li key={index} className="list-item">
                                Recipient ID: {request.recipientId}, Served by: {request.nurseId},
                                Status: {request.requestStatus}, Request Date: {formatDate(request.requestDate)},
                                Last Update: {formatDate(request.updateDate)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="requests-section">
                <button className="toggle-btn" onClick={() => toggleSection('donation')}>
                    Donation Requests
                </button>
                {showSections.donation && (
                    <ul className="list">
                        {requests.donationRequests.map((request, index) => (
                            <li key={index} className="list-item">
                                Donor ID: {request.donorId}, Handled by(ID): {request.nurseId},
                                Status: {request.requestStatus}, Request Date: {formatDate(request.requestDate)},
                                Last Update: {formatDate(request.updateDate)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="requests-section">
                <button className="toggle-btn" onClick={() => toggleSection('infection')}>
                    Infection Requests
                </button>
                {showSections.infection && (
                    <ul className="list">
                        {requests.infectionRequests.map((request, index) => (
                            <li key={index} className="list-item">
                                Patient ID: {request.donorId}, Handled by(ID): {request.nurseId},
                                Infection Type: {request.diseaseCatalogId},
                                Request Date: {formatDate(request.requestDate)},
                                Last Update: {formatDate(request.updateDate)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default History;