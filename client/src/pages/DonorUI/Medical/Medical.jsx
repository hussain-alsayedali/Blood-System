import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Medical.css';

const Medical = () => {

    const [medicalHistory, setMedicalHistory] = useState([]);
    useEffect(() => {
        Axios({
            method: 'GET',
            url: 'http://localhost:2121/donor/getUncuredInfections',
            withCredentials: true,
        })
            .then((response) => {
                setMedicalHistory(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    console.log("we are in medical page")

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
                <p>No medical history to display. v;la</p>
            )}
        </div>
    );
};

export default Medical;