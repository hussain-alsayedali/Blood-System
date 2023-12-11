import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Medical.css';

const Medical = () => {

    const [medicalHistory, setMedicalHistory] = useState([]);

    useEffect(() => {
        const fetchMedicalHistory = async () => {
            try {
                const response = await Axios.get('http://localhost:2121/getUnCuredInfections', {
                    withCredentials: true
                });
                setMedicalHistory(response.data);
            } catch (error) {
                console.error('Error fetching medical history:', error);
            }
        };

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