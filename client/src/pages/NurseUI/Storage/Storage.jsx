import React from "react";
import "./Storage.css";

function Storage() {
  const bloodInventory = [
    { type: "A+", bags: 120 },
    { type: "A-", bags: 75 },
    { type: "B+", bags: 98 },
    { type: "B-", bags: 60 },
    { type: "O+", bags: 110 },
    { type: "O-", bags: 80 },
    { type: "AB+", bags: 70 },
    { type: "AB-", bags: 50 },
  ];

  return (
    <div className="Storage-container">
      <h1 className="title">Blood Inventory Storage</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Bags Available</th>
          </tr>
        </thead>
        <tbody>
          {bloodInventory.map((inventory, index) => (
            <tr key={index}>
              <td>{inventory.type}</td>
              <td>{inventory.bags}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Storage;