import React, { useState, useEffect } from "react";
import Axios from "axios";
import './Styles/Storage.css';

function Storage() {
    const [bloodInventory, setBloodInventory] = useState([]);

    useEffect(() => {
        Axios({
            method: "GET",
            url: "http://localhost:2121/getBloodGrouped",
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data);
                // Convert and sort the object into an array
                const inventoryArray = Object.entries(res.data)
                    .map(([bloodType, bags]) => ({ bloodType, bags }))
                    .sort((a, b) => b.bags - a.bags); // Sort from most to least bags
                setBloodInventory(inventoryArray);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="Storage-container">
            <h1 className="title">Blood Inventory Storage</h1>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Blood Type</th>
                        <th>Bags Available</th>
                    </tr>
                </thead>
                <tbody>
                    {bloodInventory.map((inventory, index) => (
                        <tr key={index}>
                            <td>{inventory.bloodType}</td>
                            <td>{inventory.bags}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Storage;