import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import boss from '../assets/satiyah.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './Styles/Login.css'; // Import the CSS file

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("nurse");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    axios.post("http://localhost:2121/login", {
      username,
      password,
      role
    })
      .then(response => {
        console.log(response.data.user);
        dispatch({ type: 'SET_USER', payload: response.data.user }); // Dispatch SET_USER action
        navigate(`/${role}`);
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          setError("Wrong username or password");
        }
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          <option value="nurse">nurse</option>
          <option value="donor">donor</option>
          <option value="recipient">recipient</option>
        </select>
        <button type="submit">Login</button>
        {/* Render an error message if login fails */}
        {error && <p className="error-message">{error}</p>}
      </form>

      <br />
      <img src={boss} className="boss-image" height={250} />
      <br />
      <p className="access-buttons">Hacking buttons: (Quick access)</p>
      <Link to="/nurse"><button>Nurse</button></Link>
      <Link to="/donor"><button>Donor</button></Link>
      <Link to="/recipient"><button>Recipient</button></Link>
    </div>
  );
}

export default Login;