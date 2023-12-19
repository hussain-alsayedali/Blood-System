import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Styles/GuestInfo.css";
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
        <div className="stats">
          Receiving Requests: {recivingRequests.length}
        </div>
        <div className="stats">
          Donation Requests: {donationRequests.length}
        </div>
        <div className="stats">
          Infection Requests: {infectionRequests.length}
        </div>
        <div className="stats">
          Receiving Requests in the last 7 days:{" "}
          {recivingRequestsLast7Days.length}
        </div>
        <div className="stats">
          Donation Requests in the last 7 days:{" "}
          {donationRequestsLast7Days.length}
        </div>
        <div className="stats">
          Infection Requests in the last 7 days:{" "}
          {infectionRequestsLast7Days.length}
        </div>
        <div className="stats">
          Receiving Requests in the last 28 days:{" "}
          {recivingRequestsLast28Days.length}
        </div>
        <div className="stats">
          Donation Requests in the last 28 days:{" "}
          {donationRequestsLast28Days.length}
        </div>
        <div className="stats">
          Infection Requests in the last 28 days:{" "}
          {infectionRequestsLast28Days.length}
        </div>
        <div className="stats">Blood Drive: {bloodDrive.message}</div>
      </div>
      <h2>Payments</h2>
      {allBloodBags.map((bag) => {
        return (
          <div key={bag.id}>
            <p>taking date : {bag.takingDate} </p>
            <p>
              given to : {bag.Donor.firstName} {bag.Donor.lastName}
            </p>
            <p>money given : {bag.bloodDriveId ? "350" : "50"} riyals </p>
          </div>
        );
      })}
      <h2>Blood Drives</h2>
      {bloodDrives.map((drive) => {
        let bloodBagCount = 0;

        return (
          <div key={drive.id}>
            <p>Starting Date: {drive.startingDate}</p>
            <p>Ending Date: {drive.endingDate}</p>
            <h4>Blood Bags:</h4>
            {drive.BloodBags.map((bag) => {
              bloodBagCount++;
              return (
                <div key={bag.id}>
                  <p>Blood Bag ID: {bag.id}</p>
                  {/* Render additional blood bag details as needed */}
                </div>
              );
            })}
            <p>Total Blood Bags: {bloodBagCount}</p>
          </div>
        );
      })}
      <h2>Blood Donations in the Past Month</h2>
      {bloodDonationsMonth.map((donation) => (
        <div key={donation.id}>
          <p>Taking Date: {donation.takingDate}</p>
          <p>Status: {donation.status}</p>
          {donation.givenTo && (
            <p>Given To: {donation.givenTo.recipientName}</p>
          )}
          {donation.Donor && <p>Donor: {donation.Donor.donorName}</p>}
          {donation.BloodBank && (
            <p>Blood Bank: {donation.BloodBank.bankName}</p>
          )}
          {/* Render other blood donation details as needed */}
        </div>
      ))}
      <h2>Blood Donations in the Past Week</h2>
      {bloodDonationsWeek.map((donation) => (
        <div key={donation.id}>
          <p>Taking Date: {donation.takingDate}</p>
          <p>Status: {donation.status}</p>
          {donation.givenTo && (
            <p>Given To: {donation.givenTo.recipientName}</p>
          )}
          {donation.Donor && <p>Donor: {donation.Donor.donorName}</p>}
          {donation.BloodBank && (
            <p>Blood Bank: {donation.BloodBank.bankName}</p>
          )}
          {/* Render other blood donation details as needed */}
        </div>
      ))}
    </div>
  );
}
