import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Donate = () => {
    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        bloodType: '',
        weight: '',
        birth: '', // Added to store the user's birth date
    });
    const [constraints, setConstraints] = useState([]); // Added to store donation constraints

    useEffect(() => {
        Axios({
            method: 'GET',
            url: 'http://localhost:2121/donor/currentDonor',
            withCredentials: true, // This is important for sessions to work
        })
            .then((res) => {
                setUser({
                    id: res.data.id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    bloodType: res.data.bloodType,
                    weight: res.data.weight,
                    birth: res.data.birth,
                });

                return Axios.get('http://localhost:2121/donor/readyToDonate', {
                    withCredentials: true
                });
            })
            .then((response) => {
                // If there are constraints, update the state
                if (response.data && !response.data.ready) {
                    setConstraints(response.data.constraints);
                }
            })
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (constraints.length > 0) {
            // If there are constraints, show an alert and do not proceed
            alert('You cannot donate at this time due to the following constraints: ' + constraints.join(', '));
            console.error('Cannot donate due to constraints:', constraints);
            return;
        }
        // Handle the submission logic here for a successful donation
        // ...
    };

    return (
        <div>
            <h1>Donate Blood</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID:</label>
                    <input type="text" value={user.id} readOnly />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={`${user.firstName} ${user.lastName}`}
                        readOnly
                    />
                </div>
                <div>
                    <label>Blood Type:</label>
                    <input type="text" value={user.bloodType} readOnly />
                </div>
                <div>
                    <label>Weight:</label>
                    <input type="text" value={user.weight} readOnly />
                </div>
                <div>
                    <label>Donation Constraints:</label>
                    <ul>
                        {constraints.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                        ))}
                    </ul>
                </div>
                <button type="submit">
                    Submit a Blood Bag(450 mL)
                </button>
            </form>
        </div>
    );
};

export default Donate;