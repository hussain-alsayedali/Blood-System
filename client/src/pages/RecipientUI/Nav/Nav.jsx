import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import recieveIcon from "../../../assets/recieve.png";
import MedicalIcon from "../../../assets/order-history.png";
import bag from "../../../assets/bag.png";
import userIcon from "../../../assets/user.png";
import logoutIcon from "../../../assets/logout.png";
import logoIcon from "../../../assets/blood-donation.png";
import walletIcon from "../../../assets/wallet.png";

import Axios from "axios";

function Nav() {
    const [selectedItem, setSelectedItem] = useState("Recieve");

    const handleItemClick = (itemName) => {
        // Axios({
        //   method: "POST",
        //   url: "http://localhost:2121/nurse/logout",
        //   withCredentials: true,
        // })
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((error) => console.error(error));
        setSelectedItem(itemName);
    };

    return (
        <div>
            <nav className="nav">
                <div className="logo">
                    <img src={logoIcon} alt="BloodWave logo" className="logo-img" />
                    <h1>BloodWave</h1>
                </div>

                <div className="nav-items">
                    <NavItem
                        imgSrc={recieveIcon}
                        label="Recieve"
                        to="/recipient"
                        isSelected={selectedItem === "Recieve"}
                        onItemClick={() => handleItemClick("Recieve")}
                    />
                    <NavItem
                        imgSrc={bag}
                        label="Storage"
                        to="/recipient/storage"
                        isSelected={selectedItem === "Storage"}
                        onItemClick={() => handleItemClick("Storage")}
                    />
                    <NavItem
                        imgSrc={MedicalIcon}
                        label="Medical History"
                        to="/recipient/Medical"
                        isSelected={selectedItem === "Medical History"}
                        onItemClick={() => handleItemClick("Medical History")}
                    />
                    <NavItem
                        imgSrc={userIcon}
                        label="Profile"
                        to="/recipient/profile"
                        isSelected={selectedItem === "Profile"}
                        onItemClick={() => handleItemClick("Profile")}
                    />
                    <NavItem
                        imgSrc={walletIcon}
                        label="wallet"
                        to="/recipient/wallet"
                        isSelected={selectedItem === "wallet"}
                        onItemClick={() => handleItemClick("wallet")}

                    />
                </div>

                <NavItem
                    className="logout"
                    imgSrc={logoutIcon}
                    label="Logout"
                    to="/"
                    isSelected={selectedItem === "Logout"}
                    onItemClick={() => handleItemClick("Logout")}
                />
            </nav>
        </div>
    );
}

function NavItem({ imgSrc, label, to, isSelected, onItemClick, className }) {
    return (
        <Link
            to={to}
            className={`nav-item ${isSelected ? "selected" : ""} ${className}`}
            onClick={onItemClick}
        >
            <img src={imgSrc} alt={label} className="nav-icon" />
            <span className="nav-text">{label}</span>
        </Link>
    );
}

export default Nav;
