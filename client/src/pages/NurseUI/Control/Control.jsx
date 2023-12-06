import React, { useState, useEffect } from "react";
import "./Control.css";
import Axios from "axios";

function Control() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

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

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const startEditing = (user) => {
    setEditingId(user.id);
    setFormData(user);
  };

  const saveChanges = (user) => {
    // TODO: save the changes to the backend
    setEditingId(null);
  };

  const deleteUser = (userId, userType) => {
    Axios({
      method: "DELETE",
      url: `http://localhost:2121/nurse/deleteUser?id=${userId}&type=${userType}`,
      withCredentials: true,
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
              <td>{editingId === user.id ? (
                <input
                  name="name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              ) : (
                `${user.firstName} ${user.lastName}`
              )}
              </td>
              <td>{editingId === user.id ? (
                <input
                  name="birth"
                  value={new Date(formData.birth).getFullYear()}
                  onChange={handleInputChange}
                />
              ) : (
                new Date().getFullYear() - new Date(user.birth).getFullYear()
              )}
              </td>
              <td>{editingId === user.id ? (
                <input
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                />
              ) : (
                user.bloodType
              )}
              </td>
              <td>{editingId === user.id ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              ) : (
                user.email
              )}
              </td>
              <td>{editingId === user.id ? (
                <input
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              ) : (
                user.weight
              )}
              </td>
              <td>{editingId === user.id ? (
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                user.phone
              )}
              </td>
              <td>
                {console.log(user)}
                {editingId === user.id ? (
                  <button
                    className="action-btn save-btn"
                    onClick={() => saveChanges(user)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="action-btn edit-btn"
                    onClick={() => startEditing(user)}
                  >
                    Edit
                  </button>
                )}
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