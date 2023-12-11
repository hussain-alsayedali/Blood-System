import React from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


//signups
import SignupDonor from "./pages/DonorUI/SignupDonor";
import SignupRecipent from "./pages/RecipientUI/SignupRecipent";
import SignupNurse from "./pages/NurseUI/SignupNurse";

//styles:
import "./components/Styles/App.css";

//Nurse imports
import Nav from "./pages/NurseUI/Nav/Nav";
import Dashboard_Nurse from "./pages/NurseUI/Dashboard/Dashboard";
import Storage_Nurse from "./pages/NurseUI/Storage/Storage";
import Control_Nurse from "./pages/NurseUI/Control/Control";

//common
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

//Donor imports
import Nav_Donor from "./pages/DonorUI/Nav/Nav";
import Donate_Donor from "./pages/DonorUI/Donate/Donate";
import Storage_Donor from "./pages/DonorUI/Storage/Storage";
import Medical_Donor from "./pages/DonorUI/Medical/Medical";

// App component definition
function App() {
  return (
    // Using React Router for navigation
    <Router>
      <Routes>
        {/* Default route loads the Login component*/}
        <Route path="/" element={<Login />} />
        <Route path="/signupDonor" element={<SignupDonor />} />
        <Route path="/signupRecipent" element={<SignupRecipent />} />
        <Route path="/signupnurse" element={<SignupNurse />} />

        <Route
          path="/nurse/*"
          element={
            <>
              <Nav />

              <main className="main">
                <Routes>
                  <Route path="/" element={<Dashboard_Nurse />} />
                  <Route path="/" element={<Dashboard_Nurse />} />
                  <Route path="/dashboard" element={<Dashboard_Nurse />} />
                  <Route path="/storage" element={<Storage_Nurse />} />
                  <Route path="/control" element={<Control_Nurse />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/donorEdit" element={<SignupDonor />} />
                  <Route path="/recipientEdit" element={<SignupRecipent />} />
                </Routes>
              </main>
            </>
          }
        />

        <Route
          path="/donor/*"
          element={
            <>
              <Nav_Donor />
              <main className="main">
                <Routes>
                  <Route path="/" element={<Donate_Donor />} />
                  <Route path="/donate" element={<Donate_Donor />} />
                  <Route path="/storage" element={<Storage_Donor />} />
                  <Route path="/medical" element={<Medical_Donor />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// Export the App component as default
export default App;
