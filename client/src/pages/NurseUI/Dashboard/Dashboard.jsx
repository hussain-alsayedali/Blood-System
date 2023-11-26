import React, { useState } from "react";
import './Dashboard.css'
import criticalImage from '../../../assets/crit.png'

function Dashboard() {
  const [selectedUrgency, setSelectedUrgency] = useState("All");
  const [clickedUrgency, setClickedUrgency] = useState("");
  const [patients, setPatients] = useState([
    { id: 1, name: "Ali", bloodType: "A+", phone: "050342532", urgency: "Critical", date: "2023-11-21" },
    { id: 2, name: "Feras", bloodType: "B+", phone: "050342532", urgency: "Low", date: "2023-11-23" },
    { id: 3, name: "Messi", bloodType: "A", phone: "053342532", urgency: "Mid", date: "2023-11-22" },
    { id: 3, name: "Messi", bloodType: "A", phone: "053342532", urgency: "Served", date: "2023-11-22" },
    { id: 3, name: "Messi", bloodType: "A", phone: "053342532", urgency: "Critical", date: "2023-11-22" },
    // Add more patient data as needed
  ]);


  const sortedPatients = patients.sort((a, b) => new Date(a.date) - new Date(b.date));

  const filteredPatients = selectedUrgency === "All"
    ? sortedPatients
    : sortedPatients.filter(patient => patient.urgency === selectedUrgency);

  const urgencyOptions = ["All", "Critical", "Mid", "Low", "Served"];

  const handleClick = (option) => {
    setSelectedUrgency(option);
    setClickedUrgency(`You selected: ${option}`);
  }

  const getUrgencyLabel = (urgency) => {
    switch(urgency) {
      case 'Critical':
        return { __html: `<img src="${criticalImage}" alt="Critical" img class="urgency-image"/> Critical`, color: 'red' };
      case 'Mid':
        return { __html: 'Mid', color: 'orange' };
      case 'Served':
        return { __html: 'Served', color: 'green' };
      default:
        return { __html: urgency, color: 'white' };
    }
  }

  const handleServeClick = (patient) => {
    setPatients(patients.map(p => p.id === patient.id ? {...p, urgency: 'Served'} : p));
  }

  return (
    <div className="dashboard-container">
      {clickedUrgency && <div className="clicked-urgency">{clickedUrgency}</div>}

      <div className="total-requests">
        Total Requests: {patients.length}
      </div>

      <div className="urgency-selector">
        <label>Select Urgency:</label>
        <div className="urgency-options">
          {urgencyOptions.map((option, index) => (
            <div
              key={index}
              className={`option ${selectedUrgency === option ? 'selected' : ''}`}
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
              <th>Name</th>
              <th>Blood Type</th>
              <th>Phone</th>
              <th>Urgency</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.bloodType}</td>
                <td>{patient.phone}</td>
                <td 
                  style={{ color: getUrgencyLabel(patient.urgency).color }}
                  dangerouslySetInnerHTML={getUrgencyLabel(patient.urgency)}
                ></td>
                <td>{patient.date}</td>
                <td>
                {patient.urgency !== 'Served' && (
                  <button onClick={() => handleServeClick(patient)}>
                    Serve
                  </button>
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

export default Dashboard;