import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import './Styles/GuestInfo.css';
export default function GuestInfo() {
  const [bloodBags, setBloodBags] = useState([]);
  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [bloodDrive, setBloodDrive] = useState({
    bloodDrive: "",
    message: "",
  });
  const [recivingRequests, setRecivingRequest] = useState([]);
  const [donationRequests, setDonationRequest] = useState([]);
  const [infectionRequests, setInfectionRequest] = useState([]);

  console.log(recivingRequests);

  // Filter requests for the last 7 days
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);
  const recivingRequestsLast7Days = recivingRequests.filter(
    (request) => new Date(request.requestDate) >= last7Days
  );
  const donationRequestsLast7Days = donationRequests.filter(
    (request) => new Date(request.requestDate) >= last7Days
  );
  const infectionRequestsLast7Days = infectionRequests.filter(
    (request) => new Date(request.requestDate) >= last7Days
  );

  // Filter requests for the last 28 days
  const last28Days = new Date();
  last28Days.setDate(last28Days.getDate() - 28);
  const recivingRequestsLast28Days = recivingRequests.filter(
    (request) => new Date(request.requestDate) >= last28Days
  );
  const donationRequestsLast28Days = donationRequests.filter(
    (request) => new Date(request.requestDate) >= last28Days
  );
  const infectionRequestsLast28Days = infectionRequests.filter(
    (request) => new Date(request.requestDate) >= last28Days
  );

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/guest/getBloodBags",
      withCredentials: true,
    })
      .then((res) => {
        setBloodBags(res.data.bloodBags);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/guest/getAllPatientsDivided",
      withCredentials: true,
    })
      .then((res) => {
        setDonors(res.data.allDonors);
        setRecipients(res.data.allRecipients);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/guest/getAllRequestes",
      withCredentials: true,
    })
      .then((res) => {
        setRecivingRequest(res.data.recivingRequestes);
        setDonationRequest(res.data.donationRequestes);
        setInfectionRequest(res.data.infectionRequests);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/getCurrentBloodDrive",
      withCredentials: true,
    })
      .then((res) => {
        setBloodDrive({
          bloodDrive: res.data.bloodDrive,
          message: res.data.message,
        });
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="page">
      <div className="card">
        <h1 className="header">Guest Information Dashboard</h1>
        <div className="stats">Good Blood Bags: {bloodBags.length}</div>
        <div className="stats">Donors: {donors.length}</div>
        <div className="stats">Recipients: {recipients.length}</div>
        <div className="stats">Receiving Requests: {recivingRequests.length}</div>
        <div className="stats">Donation Requests: {donationRequests.length}</div>
        <div className="stats">Infection Requests: {infectionRequests.length}</div>
        <div className="stats">
          Receiving Requests in the last 7 days: {recivingRequestsLast7Days.length}
        </div>
        <div className="stats">
          Donation Requests in the last 7 days: {donationRequestsLast7Days.length}
        </div>
        <div className="stats">
          Infection Requests in the last 7 days: {infectionRequestsLast7Days.length}
        </div>
        <div className="stats">
          Receiving Requests in the last 28 days: {recivingRequestsLast28Days.length}
        </div>
        <div className="stats">
          Donation Requests in the last 28 days: {donationRequestsLast28Days.length}
        </div>
        <div className="stats">
          Infection Requests in the last 28 days: {infectionRequestsLast28Days.length}
        </div>
        <div className="stats">Blood Drive: {bloodDrive.message}</div>
      </div>
    </div>
  ); 
}
