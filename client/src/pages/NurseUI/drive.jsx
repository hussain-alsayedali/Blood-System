import React, { useState } from "react";
import Axios from "axios";

const Drive = () => {
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    Axios({
      method: "POST",
      url: "http://localhost:2121/nurse/createBloodDrive",
      withCredentials: true,
      data: { startingDate, endingDate },
    })
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
        setError(res.data.error);
      })
      .catch((error) => {
        console.error(error);
        setError(res.data.message);
      });
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
