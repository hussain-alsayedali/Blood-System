import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './pages/NurseUI/Nav/Nav';
import Dashboard_Nurse from './pages/NurseUI/Dashboard/Dashboard';
import Storage_Nurse from './pages/NurseUI/Storage/Storage';
import Control_Nurse from './pages/NurseUI/Control/Control';
import Profile from './components/Profile'; // Profile component
import NotFound from './components/NotFound';
import Login from './components/Login';
import './components/Styles/App.css';

// App component definition
function App() {
  return (
    // Using React Router for navigation
    <Router>
      <Routes>
        {/* Default route loads the Login component*/}
        <Route path="/" element={<Login />} />

        <Route path="/nurse/*" element={
          <>
            <Nav />

            <main className="main">
              <Routes>
                <Route path="/" element={<Dashboard_Nurse />} />

                <Route path="/dashboard" element={<Dashboard_Nurse />} />
                <Route path="/storage" element={<Storage_Nurse />} />
                <Route path="/control" element={<Control_Nurse />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </>
        } />

        <Route path="/patient/*" element={<NotFound />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// Export the App component as default
export default App;