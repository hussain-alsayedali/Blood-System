import React, { useState, useEffect } from "react";
import "./Styles/Profile.css";
import Axios from "axios";

function Profile() {
  const [user, setUsers] = useState({
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
  });
  // useEffect(() => {
  //   Axios({
  //     method: "GET",
  //     url: "http://localhost:2121/nurse/getAllDonors",
  //   })
  //     .then((res) => {
  //       setUsers(res.data);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);
  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/nurse/getCurrentNurse",
      withCredentials: true,
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log("user are ");
  console.log(user);
  return (
    <div className="profile-container">
      <h1 className="title">Profile</h1>
      <div className="profile-details">
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Age:</strong>{" "}
          {new Date().getFullYear() - new Date(user.birth).getFullYear()}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Weight:</strong> {user.weight}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>Bank ID:</strong> {user.bankId}
        </p>
      </div>
    </div>
  );
}

export default Profile;
