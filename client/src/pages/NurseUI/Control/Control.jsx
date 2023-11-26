import React, { useState } from "react";
import "./Control.css";

function Control() {
  const [search, setSearch] = useState('');

  const people = [
    { id: 21, name: "John", age: 30, bloodType: "A+", email: "john@example.com", weight: 70, phone: "040404032" },
    { id: 1, name: "Jax", age: 5000, bloodType: "PDF", email: "Jax@example.com", weight: 120, phone: "054352341" },
    { id: 23, name: "Zoe", age: 12, bloodType: "S+", email: "Zoe@example.com", weight: 35, phone: "054352341" },
    { id: 12, name: "Zoe", age: 12, bloodType: "S+", email: "Zoe@example.com", weight: 35, phone: "054352341" },
    { id: 33, name: "Zoe", age: 12, bloodType: "S+", email: "Zoe@example.com", weight: 35, phone: "054352341" },

    // Add more people baba
  ];

  const filteredPeople = people.filter(person => person.id.toString().includes(search));

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div className="control-container">
      <h1 className="title">Admin Control</h1>

      <input 
        className="search-input"
        type="number"
        placeholder="Search by ID"
        value={search}
        onChange={handleSearchChange}
      />

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Blood Type</th>
            <th>Email</th>
            <th>Weight</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPeople.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.bloodType}</td>
              <td>{person.email}</td>
              <td>{person.weight}</td>
              <td>{person.phone}</td>
              <td>
                <button className="action-btn edit-btn">Edit</button>
                <button className="action-btn delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Control;