import React, { useState, useEffect } from "react";
import "./Styles/Profile.css";
import Axios from "axios";

function Profile() {
  const [users, setUsers] = useState([
    {
      donorId: 69,
      currentMoney: 10000000,
      bankId: "jaxing",
      createdAt: "2023-12-01T05:09:33.609Z",
      email: "hussain@gama.com",
      phone: "05045353421231132",
      weight: 433,
      birth: "1990-01-01T00:00:00.000Z",
      address: "jarodiyah",
      firstName: "hussain",
      lastName: "alsayedali",
      password: "$2b$10$g/aNIBatIq0W0dZzLjB7Bu8OG5rEt/Jb4IbSHjI4AG/wkC.3RIoka",
      bloodType: "pdf",
    },
  ]);
  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/nurse/getAllDonors",
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/nurse/getCurrentNurse",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log("users are ");
  console.log(users);
  return (
    <div className="profile-container">
      <h1 className="title">Profile</h1>
      <div className="profile-details">
        <p>
          <strong>ID:</strong> {users[0].donorId}
        </p>
        <p>
          <strong>Name:</strong> {users[0].firstName} {users[0].lastName}
        </p>
        <p>
          <strong>Age:</strong>{" "}
          {new Date().getFullYear() - new Date(users[0].birth).getFullYear()}
        </p>
        <p>
          <strong>Blood Type:</strong> {users[0].bloodType}
        </p>
        <p>
          <strong>Email:</strong> {users[0].email}
        </p>
        <p>
          <strong>Phone:</strong> {users[0].phone}
        </p>
        <p>
          <strong>Weight:</strong> {users[0].weight}
        </p>
        <p>
          <strong>Address:</strong> {users[0].address}
        </p>
        <p>
          <strong>Bank ID:</strong> {users[0].bankId}
        </p>
        <p>
          <strong>Current Money:</strong> {users[0].currentMoney}
        </p>
      </div>
    </div>
  );
}

export default Profile;
