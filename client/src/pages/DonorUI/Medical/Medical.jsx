import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Medical.css';

const Medical = () => {

    const [medicalHistory, setMedicalHistory] = useState([]);

    useEffect(() => {
        // Function to fetch medical history from your backend
        const fetchMedicalHistory = async () => {
            try {
                // Fetching the medical history from your endpoint
                const response = await Axios.get('http://localhost:2121/getAllInfections', {
                    withCredentials: true // Including credentials if you use them for authentication
                });
                setMedicalHistory(response.data); // Assuming response.data contains the medical history
            } catch (error) {
                console.error('Error fetching medical history:', error);
            }
        };

        // Call the function to fetch data
        fetchMedicalHistory();
    }, []);

    return (
        <div className="medical-container">
            <h2>Your Medical History</h2>
            {medicalHistory.length > 0 ? (
                <ul>
                    {medicalHistory.map((record, index) => (
                        <li key={index}>
                            <div><strong>Disease:</strong> {record.diseaseName}</div>
                            <div><strong>Date of Infection:</strong> {record.dateOfInfection}</div>
                            <div><strong>Status:</strong> {record.cured ? 'Cured' : 'Under Treatment'}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No medical history to display.</p>
            )}
        </div>
    );
};

export default Medical;