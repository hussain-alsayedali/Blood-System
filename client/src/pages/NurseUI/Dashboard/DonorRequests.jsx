import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Axios from "axios";

const DonorRequests = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE;
  useEffect(() => {
    Axios({
      method: "GET",
      url: apiUrl + "/nurse/getWaitingRequestes",
      withCredentials: true,
    })
      .then((res) => {
        setDonationRequests(res.data.donationRequestes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAccept = (requestId, donorId) => {
    Axios({
      method: "POST",
      url: apiUrl + "/nurse/acceptDonationRequest",
      data: {
        requestId,
        donorId,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log("Request accepted:", response);
        // Update the donationRequests state to reflect the change
        setDonationRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId
              ? { ...request, requestStatus: "accepted" }
              : request
          )
        );
      })
      .catch((error) => {
        console.error("Error accepting request:", error);
      });
  };

  const handleDecline = (requestId, donorId) => {
    Axios({
      method: "POST",
      url: apiUrl + "/nurse/declineDonationRequest",
      data: {
        requestId,
        donorId,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log("Request declined:", response);
        // Update the donationRequests state to reflect the change
        setDonationRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId
              ? { ...request, requestStatus: "rejected" }
              : request
          )
        );
      })
      .catch((error) => {
        console.error("Error declining request:", error);
      });
  };

  return (
    <div className="dashboard-container">
      <div className="total-requests">
        Total Donation Requests: {donationRequests.length}
      </div>

      <div className="donation-requests-list">
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Request Date</th>
              <th>Donor ID</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donationRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{new Date(request.requestDate).toLocaleString()}</td>
                <td>{request.donorId}</td>
                <td>{request.donor.phone}</td>
                <td>{request.requestStatus}</td>
                <td>
                  <button
                    onClick={() => handleAccept(request.id, request.donorId)}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(request.id, request.donorId)}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorRequests;
