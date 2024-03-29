import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Axios from "axios";

const InfectionRequests = () => {
  const [infectionRequests, setInfectionRequests] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE;
  useEffect(() => {
    Axios({
      method: "GET",
      url: apiUrl + "/nurse/getWaitingInfectionRequests",
      withCredentials: true,
    })
      .then((res) => {
        setInfectionRequests(res.data.infectionRequests);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAccept = (requestId, requesterType, requesterId) => {
    Axios({
      method: "POST",
      url: apiUrl + "/nurse/acceptInfectionRequest",
      data: {
        requestId,
        requesterType,
        requesterId,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log("Infection request accepted:", response);
        setInfectionRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId
              ? { ...request, requestStatus: "accepted" }
              : request
          )
        );
      })
      .catch((error) => {
        console.error("Error accepting infection request:", error);
      });
  };

  const handleDecline = (requestId) => {
    Axios({
      method: "POST",
      url: apiUrl + "/nurse/declineInfectionRequest",
      data: {
        requestId,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log("Infection request declined:", response);
        setInfectionRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId
              ? { ...request, requestStatus: "rejected" }
              : request
          )
        );
      })
      .catch((error) => {
        console.error("Error declining infection request:", error);
      });
  };

  return (
    <div className="dashboard-container">
      <div className="total-requests">
        Total Infection Requests: {infectionRequests.length}
      </div>

      <div className="infection-requests-list">
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Request Date</th>
              <th>donor ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {infectionRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.requestDate}</td>
                <td>{request.donorId}</td>
                <td>{request.requestStatus}</td>
                <td>
                  <button
                    onClick={() =>
                      handleAccept(request.id, request.requesterId)
                    }
                  >
                    Accept
                  </button>
                  <button onClick={() => handleDecline(request.id)}>
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

export default InfectionRequests;
