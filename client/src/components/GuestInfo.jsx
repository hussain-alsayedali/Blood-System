import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Styles/GuestInfo.css";

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

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

  const [bloodDrives, setBloodDrives] = useState([]);
  const [bloodDonationsWeek, setBloodDonationsWeek] = useState([]);
  const [bloodDonationsMonth, setBloodDonationsMonth] = useState([]);
  const [allBloodBags, setAllBloodBags] = useState([]);
  console.log("bags");
  console.log(allBloodBags);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/guest/getAllConfiremedPayments",
      withCredentials: true,
    })
      .then((res) => {
        setAllBloodBags(res.data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/guest/getAllBloodDrives",
      withCredentials: true,
    })
      .then((res) => {
        setBloodDrives(res.data.allBloodDrives);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/guest/getAllDonationInWeek",
      withCredentials: true,
    })
      .then((res) => {
        setBloodDonationsWeek(res.data.bloodBagsWithinWeek);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    Axios({
      method: "GET",
      url: "http://localhost:2121/guest/getAllDonationInMonth",
      withCredentials: true,
    })
      .then((res) => {
        setBloodDonationsMonth(res.data.bloodBagsWithinMonth);
      })
      .catch((error) => console.error(error));
  }, []);
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
        <div className="stats">Receiving Requests in the last 7 days: {recivingRequestsLast7Days.length}</div>
        <div className="stats">Donation Requests in the last 7 days: {donationRequestsLast7Days.length}</div>
        <div className="stats">Infection Requests in the last 7 days: {infectionRequestsLast7Days.length}</div>
        <div className="stats">Receiving Requests in the last 28 days: {recivingRequestsLast28Days.length}</div>
        <div className="stats">Donation Requests in the last 28 days: {donationRequestsLast28Days.length}</div>
        <div className="stats">Infection Requests in the last 28 days: {infectionRequestsLast28Days.length}</div>
        <div className="stats">Blood Drive: {bloodDrive.message}</div>
      </div>

      <div className="card">
        <h2 className="header">Payments</h2>
        {allBloodBags.map((bag) => (
          <div key={bag.id} className="stats">
            <p><strong>Taking Date:</strong> {formatDate(bag.takingDate)}</p>
            <p><strong>Given To:</strong> {`${bag.Donor.firstName} ${bag.Donor.lastName}`}</p>
            <p><strong>Money Given:</strong> {bag.bloodDriveId ? "350" : "50"} Riyals</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="header">Blood Drives</h2>
        {bloodDrives.map((drive) => {
          return (
            <div key={drive.id} className="stats">
              <p><strong>Starting Date:</strong> {formatDate(drive.startingDate)}</p>
              <p><strong>Ending Date:</strong> {formatDate(drive.endingDate)}</p>
              <p><strong>Total Blood Bags:</strong> {drive.BloodBags.length}</p>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h2 className="header">Blood Donations in the Past Month</h2>
        {bloodDonationsMonth.map((donation) => (
          <div key={donation.id} className="stats">
            <p><strong>Taking Date:</strong> {formatDate(donation.takingDate)}</p>
            <p><strong>Status:</strong> {donation.status}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="header">Blood Donations in the Past Week</h2>
        {bloodDonationsWeek.map((donation) => (
          <div key={donation.id} className="stats">
            <p><strong>Taking Date:</strong> {formatDate(donation.takingDate)}</p>
            <p><strong>Status:</strong> {donation.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
