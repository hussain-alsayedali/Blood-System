import React, { useState, useEffect } from 'react';
import './History.css';

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

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
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filterById = (requests, id) => {
        if (!id) return requests;
        const searchTerm = isNaN(id) ? id : Number(id);

        return requests.filter(request => {
            const recipientIdString = String(request.recipientId);
            const donorIdString = String(request.donorId);

            return (
                recipientIdString.includes(String(searchTerm)) ||
                donorIdString.includes(String(searchTerm))
            );
        });
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1 className="heading">History</h1>

            <input
                type="text"
                placeholder="Search by ID..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />

            <div className="requests-section">
                <button className="toggle-btn" onClick={() => toggleSection('receiving')}>
                    Receiving Requests
                </button>
                {showSections.receiving && (
                    <ul className="list">
                        {filterById(requests.receivingRequests, searchTerm).map((request, index) => (
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
                        {filterById(requests.donationRequests, searchTerm).map((request, index) => (
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
                        {filterById(requests.infectionRequests, searchTerm).map((request, index) => (
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