import React, { useState, useEffect } from "react";
import "./Control.css";
import Axios from "axios";
import Modal from "../../../components/Modal"; // this is the popup window for Diseases
function Control() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [editingObj, setEditingObj] = useState({ id: 0, type: "" });
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newDisease, setNewDisease] = useState("");
  const [bloodBags, setBloodBags] = useState([]);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/nurse/getDonationsweek",
      withCredentials: true,
    })
      .then((res) => {
        setBloodBags(res.data);
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/nurse/getAll",
      withCredentials: true,
    })
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
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
    // setEditingId(user.id);
    setEditingObj({ id: user.id, type: user.type });
    setFormData(user);
  };

  const saveChanges = (user) => {
    // TODO: save the changes to the backend
    Axios({
      method: "POST",
      data: {
        ...formData,
        _method: "PUT", // Include the method override as a form field or query parameter
      },
      withCredentials: true,
      url: "http://localhost:2121/nurse/editPatientInfo",
    })
      .then((response) => {
        console.log(response);
        console.log("edited User added:", response.data);
        // Update the UI or state as necessary
      })
      .catch((error) => {
        console.error("Error adding infection:", error);
        alert("An error occurred while trying to add the disease.");
      });
    setEditingObj({});
  };

  const deleteUser = (userId, userType) => {
    Axios({
      method: "DELETE",
      url: `http://localhost:2121/nurse/deleteUser?id=${userId}&type=${userType}`,
      withCredentials: true,
    });
  };

  const openModal = (user) => {
    setSelectedUser(user);
    console.log(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // for filling the drop down
  const [diseases, setDiseases] = useState([]);
  useEffect(() => {
    console.log("test0");
    Axios.get("http://localhost:2121/donor/getDiseases", {
      withCredentials: true,
    })
      .then((response) => {
        console.log("test1");
        console.log("Diseases received:", response.data);
        setDiseases(response.data);
      })
      .catch((error) => {
        console.log("test3");
        console.error("Error fetching diseases:", error);
      });
  }, []);

  const addInfection = (e) => {
    e.preventDefault();

    if (!newDisease) {
      alert("Please select a disease to add.");
      return;
    }

    const infectionData = {
      strength: "mid", //todo ui later
      donorId: selectedUser.id,
      diseaseId: newDisease,
    };
    console.log("the new diseseas is " + newDisease);
    Axios({
      method: "POST",
      data: infectionData,
      withCredentials: true,
      url: "http://localhost:2121/nurse/addInfection",
      // crossDomain: true,
    })
      .then((response) => {
        console.log(response);
        console.log("Infection added:", response.data);
        // Update the UI or state as necessary
      })
      .catch((error) => {
        console.error("Error adding infection:", error);
        alert("An error occurred while trying to add the disease.");
      });

    // Clear the state variables if needed
    setNewDisease("");
    // Set strength back to default or empty if you're managing it in the state
  };

  return (
    <div className="control-container">
      <h1 className="title">Admin Control</h1>

      {/* THIS IS THE SEARCH BAR */}
      <input
        className="search-input"
        type="number"
        placeholder="Search by ID"
        value={search}
        onChange={handleSearchChange}
      />

      {/* THIS IS THE POPUP WINDOW FOR DISEASES. */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Patient Medical History</h2>
        {selectedUser && (
          <div className="patient-history">
            <p>{`History for user ID: ${selectedUser.id}`}</p>
            {/* Display the current disease status */}
            <div className="current-disease">
              <h3>Current Disease Status</h3>
              {selectedUser &&
              selectedUser.infections &&
              selectedUser.infections.length > 0 ? (
                <ul>
                  {selectedUser.infections.map((infection, index) => (
                    <li key={index}>{infection.disease.diseaseName}</li>
                  ))}
                </ul>
              ) : (
                <p>No disease reported</p>
              )}
            </div>
            {/* Display the requests to change the disease status */}
            <div className="change-requests">
              <h3>Change Requests</h3>
              <p>No change requests.</p>
            </div>
            {/* Form to change disease status */}
            <form onSubmit={addInfection} className="add-status-form">
              <h3>Add a Disease</h3>
              <select
                value={newDisease}
                onChange={(e) => setNewDisease(e.target.value)}
              >
                <option value="" disabled>
                  Select a disease
                </option>
                {diseases.map((disease) => (
                  <option key={disease.id} value={disease.id}>
                    {disease.diseaseName}
                  </option>
                ))}
              </select>
              <button type="submit">Add Status</button>
            </form>
          </div>
        )}
      </Modal>

      {/* THIS IS THE TABLE TO DISPLAY ALL USERS */}
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
                {editingObj.id === user.id && editingObj.type === user.type ? (
                  <input
                    name="name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                ) : (
                  `${user.firstName} ${user.lastName}`
                )}
              </td>
              <td>
                {editingObj.id === user.id && editingObj.type === user.type ? (
                  <input
                    type="date"
                    name="birth"
                    value={formData.birth}
                    onChange={handleInputChange}
                  />
                ) : (
                  new Date().getFullYear() - new Date(user.birth).getFullYear()
                )}
              </td>
              <td>
                {editingObj.id === user.id && editingObj.type === user.type ? (
                  <input
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.bloodType
                )}
              </td>
              <td>
                {editingObj.id === user.id && editingObj.type === user.type ? (
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingObj.id === user.id && editingObj.type === user.type ? (
                  <input
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.weight
                )}
              </td>
              <td>
                {editingObj.id === user.id && editingObj.type === user.type ? (
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
                {editingObj.id === user.id && editingObj.type === user.type ? (
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
                <button
                  className="action-btn disease-btn"
                  onClick={() => openModal(user)}
                >
                  Disease
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
