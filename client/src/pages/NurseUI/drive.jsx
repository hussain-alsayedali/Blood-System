import React, { useState, useEffect } from "react";
import Axios from "axios";

const Drive = () => {
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [bloodDrives, setBloodDrives] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE;
  useEffect(() => {
    Axios({
      method: "GET",
      url: apiUrl + "/guest/getAllBloodDrives",
      withCredentials: true,
    })
      .then((res) => {
        setBloodDrives(res.data.allBloodDrives);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    Axios({
      method: "POST",
      url: apiUrl + "/nurse/createBloodDrive",
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
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

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

      {/* Blood Drives Expandable Section */}
      <div className="card">
        {/* Add onClick to toggle visibility */}
        <h2>Blood Drives</h2>
        {bloodDrives.map((drive) => (
          <div key={drive.id} className="stats">
            <p>
              <strong>Starting Date:</strong> {formatDate(drive.startingDate)}
            </p>
            <p>
              <strong>Ending Date:</strong> {formatDate(drive.endingDate)}
            </p>
            <p>
              <strong>Total Blood Bags:</strong> {drive.BloodBags.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drive;
