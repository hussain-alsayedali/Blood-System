import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Donate.css";
const Donate = () => {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    bloodType: "",
    weight: "",
    birth: "", // Added to store the user's birth date
  });
  const [constraints, setConstraints] = useState([]); // Added to store donation constraints
  const [bloodDriveObj, setBloodDriveObj] = useState({
    bloodDrive: "",
    message: "",
  });
  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/donor/currentDonor",
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

        return Axios.get("http://localhost:2121/donor/readyToDonate", {
          withCredentials: true,
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

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/getCurrentBloodDrive",
      withCredentials: true, // This is important for sessions to work
    }).then((res) => {
      console.log(res.data);
      setBloodDriveObj(res.data);
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (constraints.length > 0) {
      alert(
        "You cannot donate at this time due to the following constraints: " +
          constraints.join(", ")
      );
      console.error("Cannot donate due to constraints:", constraints);
      return;
    }

    // Submit the donation to the backend.
    Axios.post(
      "http://localhost:2121/donor/createDonationRequest",
      {
        donorId: user.id,
        // Include any additional data your backend requires here.
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        alert("Donation request was sent successfully");
        // Refresh the donation requests list after successful submission
        return fetchDonationRequests(); // Make sure to return this promise
      })
      .then(() => {
        console.log("Donation requests have been refreshed successfully.");
      })
      .catch((error) => {
        // console.error("An error occurred:", error);
        // alert("An error occurred. Please try again later.");
      });
  };

  const [donationRequests, setDonationRequests] = useState([]);
  useEffect(() => {
    console.log("Attempting to fetch donation requests");
    Axios({
      method: "GET",
      url: "http://localhost:2121/donor/getAllRequests",
      withCredentials: true,
    })
      .then((response) => {
        console.log("Donation requests fetched successfully:", response.data);
        setDonationRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching donation requests", error);
      });
  }, []);

  return (
    <div>
      <h1>Donate Blood + {bloodDriveObj.message}</h1>
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
        <button type="submit">Submit a Blood Bag(450 mL)</button>
      </form>

      {/* Section to display donation requests */}
      <div className="donation-requests">
        <h2>My Donation Requests</h2>
        {donationRequests.length > 0 ? (
          <ul>
            {donationRequests.map((request) => (
              <li key={request.id} className="donation-request-item">
                <p className="request-date">
                  Date: {new Date(request.requestDate).toLocaleDateString()}
                </p>
                <p className="request-status">
                  Status: {request.requestStatus}
                </p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-requests-message">No donation requests found.</p>
        )}
      </div>
    </div>
  );
};

export default Donate;
