import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Medical.css';

const Medical = () => {
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [selectedDiseaseId, setSelectedDiseaseId] = useState('');

    useEffect(() => {
        // Fetch medical history
        Axios.get('http://localhost:2121/donor/getUncuredInfections', { withCredentials: true })
            .then(response => setMedicalHistory(response.data))
            .catch(error => console.error('Error fetching medical history:', error));

        // Fetch all diseases
        Axios.get('http://localhost:2121/donor/getDiseases', { withCredentials: true })
            .then(response => setDiseases(response.data))
            .catch(error => console.error('Error fetching diseases:', error));
    }, []);

    const handleAddInfection = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:2121/donor/addInfectionRequest', {
            diseaseId: selectedDiseaseId
        }, { withCredentials: true })
            .then(response => {
                console.log('Infection request added:', response.data);
                alert("request sent succefully")
            })
            .catch(error => {
                console.error('Error adding infection request:', error);
            });
    };

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

            {/* Add Infection Form */}
            <form onSubmit={handleAddInfection}>
                <h3>Add Infection</h3>
                <select
                    value={selectedDiseaseId}
                    onChange={(e) => setSelectedDiseaseId(e.target.value)}
                    required
                >
                    <option value="">Select Disease</option>
                    {diseases.map((disease) => (
                        <option key={disease.id} value={disease.id}>
                            {disease.diseaseName}
                        </option>
                    ))}
                </select>
                <button type="submit">Add Infection</button>
            </form>
        </div>
    );
};

export default Medical;