import React, { useState, useEffect } from "react";
import "./Styles/Profile.css";
import Axios from "axios";

function Profile() {
  const [user, setUsers] = useState({
    donorId: 0,
    currentMoney: 0,
    bankId: "",
    createdAt: "",
    email: "",
    phone: "",
    weight: 0,
    birth: "",
    address: "",
    firstName: "",
    lastName: "",
    password: "",
    bloodType: "",
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
  const apiUrl = import.meta.env.VITE_API_BASE;
  useEffect(() => {
    Axios({
      method: "GET",
      url: apiUrl + "/nurse/getCurrentNurse",
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
