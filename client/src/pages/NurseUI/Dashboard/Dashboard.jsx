import React, { useState } from "react";
import "./Dashboard.css";
import RecipientRequests from './RecipientRequests';
import DonorRequests from "./DonorRequests";
import InfectionRequests from "./InfectionRequests";

function Dashboard({ patientsData }) {
  const [activeTab, setActiveTab] = useState('recipients');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'recipients':
        return <RecipientRequests patientsData={patientsData} />;
      case 'donors':
        return <DonorRequests patientsData={patientsData} />;
      case 'infections':
        return <InfectionRequests patientsData={patientsData} />;
      default:
        return <RecipientRequests patientsData={patientsData} />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <p>Choose a Tab to Display: </p>
        <button
          className={`header-tab ${activeTab === 'recipients' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipients')}
        >
          Recipient Requests
        </button>
        <button
          className={`header-tab ${activeTab === 'donors' ? 'active' : ''}`}
          onClick={() => setActiveTab('donors')}
        >
          Donor Requests
        </button>
        <button
          className={`header-tab ${activeTab === 'infections' ? 'active' : ''}`}
          onClick={() => setActiveTab('infections')}
        >
          Infection Reports
        </button>
        {/* Add more buttons if there are more tabs */}
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Dashboard;