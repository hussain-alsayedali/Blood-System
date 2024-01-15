import React, { useState, useEffect } from "react";
import Axios from "axios";
// import './Recipient.css'

const Recipient = () => {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    bloodType: "",
  });

  const [requests, setRequests] = useState([]); // State for storing receiving requests
  const apiUrl = import.meta.env.VITE_API_BASE;
  // Fetch user data
  useEffect(() => {
    Axios.get(apiUrl + "/recipient/currentRecipient", {
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

  // Fetch the receiving requests
  useEffect(() => {
    Axios.get(apiUrl + "/recipient/getAllRequests", {
      withCredentials: true,
    })
      .then((res) => {
        setRequests(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Starting the submit process");

    Axios.post(
      apiUrl + "/recipient/createRequest",
      {
        recipientId: user.id,
        // Include any additional data your backend requires here.
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        console.log("Response from server:", response);
        if (response && response.status === 200) {
          alert("Request was sent successfully");
        } else {
          console.log("Unexpected response", response);
        }
      })
      .catch((error) => {
        console.error("An error occurred while submitting the request:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  console.log(requests);
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
        <button type="submit">Submit Blood Request</button>
      </form>

      <h2>Requests History</h2>
      {requests.length > 0 ? (
        <ul>
          {requests.map((request) => {
            // Create a new Date object from the request date
            const readableDate = new Date(request.requestDate).toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }
            );

            // Return the list item with formatted date and status
            return (
              <li key={request.id} style={{ marginBottom: "10px" }}>
                <div>
                  <strong>Date:</strong> {readableDate}
                </div>
                <div>
                  <strong>Status:</strong> {request.requestStatus}
                </div>
                {/* Add additional details here as needed */}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No requests found.</p>
      )}
    </div>
  );
};

export default Recipient;
