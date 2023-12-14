import React, { useState, useEffect } from 'react';
import Axios from 'axios';
// import './Recipient.css'

const Recipient = () => {
    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        bloodType: '',
    });

    useEffect(() => {
        Axios({
            method: 'GET',
            url: 'http://localhost:2121/recipient/currentRecipient',
            withCredentials: true,
        })
            .then((res) => {
                setUser({
                    id: res.data.id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    bloodType: res.data.bloodType,
                });
            })
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log that we are starting the submit process
        console.log('Starting the submit process');

        Axios.post('http://localhost:2121/recipient/createRequest', {
            recipientId: user.id,
            // Include any additional data your backend requires here.
        }, {
            withCredentials: true
        })
            .then(response => {
                // Log the response from the server
                console.log('Response from server:', response);

                // Check if the response has a specific property or status you expect
                if (response && response.status === 200) {
                    // If the response is as expected, show the alert
                    alert("Request was sent successfully");
                } else {
                    // If the response is not as expected, log the issue
                    console.log('Unexpected response', response);
                }

                // Handle additional actions after successful submission if necessary
            })
            .catch(error => {
                // Log any error that occurs during the request
                console.error("An error occurred while submitting the request:", error);
                alert("An error occurred. Please try again later.");
            });
    };
    return (
        <div>
            <h1>Receive Blood</h1>
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
                <button type="submit">
                    Submit Blood Request
                </button>
            </form>
        </div>
    );
};

export default Recipient;