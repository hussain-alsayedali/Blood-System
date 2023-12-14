import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import criticalImage from "../../../assets/crit.png";
import Axios from "axios";
function RecipientRequests() {
    // the blood type and what it can recieve from.🩸
    const bloodTypeCompatibility = {
        "A+": ["A+", "A-", "O+", "O-"],
        "A-": ["A-", "O-"],
        "B+": ["B+", "B-", "O+", "O-"],
        "B-": ["B-", "O-"],
        "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        "AB-": ["AB-", "A-", "B-", "O-"],
        "O+": ["O+", "O-"],
        "O-": ["O-"],
    };

    const [selectedUrgency, setSelectedUrgency] = useState("All");
    const [clickedUrgency, setClickedUrgency] = useState("");
    const [patients, setPatients] = useState([]); // Now starts as an empty array

    // Fetch recipient requests on component mount
    useEffect(() => {
        Axios({
            method: 'GET',
            url: 'http://localhost:2121/nurse/getWaitingRequestes', // Update this URL to match your route
            withCredentials: true,
        })
            .then((res) => {
                setPatients(res.data.recivingRequestes);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const sortedPatients = patients.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    const filteredPatients =
        selectedUrgency === "All"
            ? sortedPatients
            : sortedPatients.filter((patient) => patient.urgency === selectedUrgency);

    const urgencyOptions = ["All", "Critical", "Mid", "Low", "Served"];

    const handleClick = (option) => {
        setSelectedUrgency(option);
        setClickedUrgency(`You selected: ${option}`);
    };

    const getUrgencyLabel = (urgency) => {
        switch (urgency) {
            case "Critical":
                return {
                    __html: `<img src="${criticalImage}" alt="Critical" img class="urgency-image"/> Critical`,
                    color: "red",
                };
            case "Mid":
                return { __html: "Mid", color: "orange" };
            case "Served":
                return { __html: "Served", color: "green" };
            default:
                return { __html: urgency, color: "white" };
        }
    };

    const handleServeClick = (patient, bloodType) => {
        setPatients(
            patients.map((p) =>
                p.id === patient.id
                    ? { ...p, urgency: "Served", servedBloodType: bloodType }
                    : p
            )
        );
    };


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="dashboard-container">
            {clickedUrgency && (
                <div className="clicked-urgency">{clickedUrgency}</div>
            )}

            <div className="total-requests">Total Requests: {patients.length}</div>

            <div className="urgency-selector">
                <label>Select Urgency:</label>
                <div className="urgency-options">
                    {urgencyOptions.map((option, index) => (
                        <div
                            key={index}
                            className={`option ${selectedUrgency === option ? "selected" : ""
                                }`}
                            onClick={() => handleClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>

            <div className="patients-list">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Blood Type</th>
                            <th>Urgency</th>
                            <th>Date</th>
                            <th>Give blood type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient, index) => (
                            <tr key={index}>
                                <td>{patient.recipientId}</td>
                                <td>{patient.recipient.firstName + " " + patient.recipient.lastName}</td>
                                <td>{patient.recipient.bloodType}</td>
                                <td
                                    style={{ color: getUrgencyLabel(patient.recipient.currentUrgency).color }}
                                    dangerouslySetInnerHTML={getUrgencyLabel(patient.recipient.currentUrgency)}
                                ></td>
                                <td>{formatDate(patient.requestDate)}</td>
                                <td>
                                    {patient.recipient.currentUrgency !== "Served" &&
                                        bloodTypeCompatibility[patient.recipient.bloodType].map(
                                            (bloodType) => (
                                                <button
                                                    onClick={() => handleServeClick(patient, bloodType)}
                                                >
                                                    {bloodType}
                                                </button>
                                            )
                                        )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecipientRequests;