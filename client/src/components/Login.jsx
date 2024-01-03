import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import boss from "../assets/satiyah.jpg";
import { Link } from "react-router-dom";
import Axios from "axios";

import logoIcon from "../assets/blood-donation.png";
import "./Styles/Login.css"; // Import the CSS file
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    Axios.post(
      `http://localhost:2121/${role}/login`,
      {
        email,
        password,
        role,
      },
      { withCredentials: true }
    )
      .then((response) => {
        console.log(response);
        // dispatch({ type: "SET_USER", payload: response.data.user }); // Dispatch SET_USER action
        navigate(`/${role}`);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          setError("Wrong username or password");
        }
      });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    //signup logic here
  };

  return (
    <div className="main-container">
      <div className="logo">
        <img src={logoIcon} alt="BloodWave logo" className="logo-img" />
        <h1>BloodWave</h1>
      </div>
      <div className="login-container">
        {isSignup ? (
          <div className="signup-form">
            <Link to="/signupDonor">
              <button>Sign up as Donor</button>
            </Link>
            <Link to="/signupRecipent">
              <button>Sign up as Recipent</button>
            </Link>
            <Link to="/signupNurse">
              <button>Sign up as Nurse</button>
            </Link>
            <div className="signup-text" onClick={() => setIsSignup(false)}>
              Login instead
            </div>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleLogin}>
            <p>LOGIN</p>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select your role</option> // new default option
              <option value="nurse">nurse</option>
              <option value="donor">donor</option>
              <option value="recipient">recipient</option>
            </select>
            <button type="submit">Login</button>
            {/* Render an error message if login fails */}
            {error && <p className="error-message">{error}</p>}
            <div className="login-text" onClick={() => setIsSignup(true)}>
              Do you want to sign up?
            </div>
          </form>
        )}

        <Link to="/guest">
          <button>Browse as guest</button>
        </Link>
      </div>
      {/* to be deleted... hack buttons */}
      ---------------------- <br></br>
      <p>donor acc: don@don.com | pass: adminadmin</p>
      <p>donor no constraints: dd@dd.dd | adminadmin </p>
      <p>nurse: admin@admin.com | adminadmin</p>
      <p>recipient: recipient@r.com | adminadmin</p>
      developers buttons
      <Link to="/nurse">
        <button>Nurse</button>
      </Link>
      <Link to="/donor">
        <button>Donor</button>
      </Link>
      <Link to="/recipient">
        <button>Recipient</button>
      </Link>
    </div>
  );
}

export default Login;
