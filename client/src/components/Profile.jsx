import React, { useState, useEffect } from "react";
import "./Styles/Profile.css";
import { useSelector } from "react-redux";
import Axios from "axios";

function Profile() {
  // const user = useSelector(state => state.user); // Select user data from Redux store
  const [users, setUsers] = useState([
    {
      donorId: 5,
      currentMoney: 0,
      bankId: "kidasw",
      createdAt: "2023-12-01T05:09:33.609Z",
      email: "zxxhuss@gama.com",
      phone: "u5432e",
      weight: 70,
      birth: "1990-01-01T00:00:00.000Z",
      address: "asdsda",
      firstName: "kkkw",
      lastName: "sdaw",
      password: "$2b$10$g/aNIBatIq0W0dZzLjB7Bu8OG5rEt/Jb4IbSHjI4AG/wkC.3RIoka",
      bloodType: "B+",
    },
  ]);
  useEffect(() => {
    Axios({
      method: "GET",
      // withCredentials: true,
      url: "http://localhost:2121/nurse/getAllDonors",
      // crossDomain: true,
    })
      .then((res) => {
        setUsers(res.data);
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
          <strong>Name:</strong> {users[0].firstName}
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
      </div>
    </div>
  );
}

export default Profile;
