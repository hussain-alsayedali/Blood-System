import React from "react";
import "./Styles/Profile.css";
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector(state => state.user); // Select user data from Redux store

  return (
    <div className="profile-container">
      <h1 className="title">Profile</h1>
      <div className="profile-details">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.firstName}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Blood Type:</strong> {user.bloodType}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </div>
  );
}

export default Profile;