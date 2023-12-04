import React, { useState, useEffect } from "react";
import "./Control.css";
import Axios from "axios";

function Control() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([
    // Add more people baba
  ]);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/nurse/getAll",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => console.error(error));
  }, []);
  const filterdUsers = users.filter((user) =>
    user.id.toString().includes(search)
  );

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const deleteUser = (userId, userType) => {
    Axios({
      method: "DELETE",
      url: `http://localhost:2121/nurse/deleteUser?id=${userId}&type=${userType}`,
      withCredentials: true,
      data: {
        _method: "DELETE",
        // Other request data...
      },
    });
  };

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
            <th>Type</th>
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
          {filterdUsers.map((user) => (
            <tr key={user.id + user.type}>
              <td>{user.id}</td>
              <td>{user.type}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>
                {new Date().getFullYear() - new Date(user.birth).getFullYear()}
              </td>
              <td>{user.bloodType}</td>
              <td>{user.email}</td>
              <td>{user.weight}</td>
              <td>{user.phone}</td>
              <td>
                <button className="action-btn edit-btn">Edit</button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => deleteUser(user.id, user.type)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Control;
