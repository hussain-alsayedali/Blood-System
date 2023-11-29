import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

export default function SignupNurse() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    weight: 0,
    email: "",
    phone: "",
    bankId: "",
    birth: new Date(),
    address: "",
    password: "",
  });
  console.log(formData);

  const register = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    Axios({
      method: "POST",
      data: formData,
      withCredentials: true,
      url: "http://localhost:2121/signupnurse",
    })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };
  function handleChange(event) {
    console.log(event);
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   submitToApi(formData);
  // }

  return (
    <form onSubmit={register}>
      <input
        type="text"
        placeholder="First Name"
        onChange={handleChange}
        name="firstName"
        value={formData.firstName}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={handleChange}
        name="lastName"
        value={formData.lastName}
      />
      <input
        type="number"
        placeholder="weight"
        onChange={handleChange}
        name="weight"
        value={formData.weight}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={handleChange}
        name="email"
        value={formData.email}
      />
      <input
        type="text"
        value={formData.address}
        placeholder="address"
        onChange={handleChange}
        name="address"
      />
      <input
        type="date"
        value={formData.birth}
        placeholder="birth"
        onChange={handleChange}
        name="birth"
      />
      <input
        type="password"
        value={formData.password}
        placeholder="password"
        onChange={handleChange}
        name="password"
      />

      <label htmlFor="bloodType">What is your bloodType ?</label>
      <br />

      <br />
      <br />
      <button>Submit</button>
    </form>
  );
}
