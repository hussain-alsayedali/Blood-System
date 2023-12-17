import React, { useState } from 'react';

const Drive = () => {
    const [startingDate, setStartingDate] = useState('');
    const [endingDate, setEndingDate] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:2121/nurse/createBloodDrive', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ startingDate, endingDate }),
            });

            if (response.status === 400 || response.status === 500) {
                const result = await response.json();
                throw new Error(result.error || 'An error occurred');
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setMessage(result.message);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Create a Blood Drive</h1>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="startingDate">Starting Date:</label>
                    <input
                        type="date"
                        id="startingDate"
                        value={startingDate}
                        onChange={(e) => setStartingDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="endingDate">Ending Date:</label>
                    <input
                        type="date"
                        id="endingDate"
                        value={endingDate}
                        onChange={(e) => setEndingDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Blood Drive</button>
            </form>
        </div>
    );
};

export default Drive;