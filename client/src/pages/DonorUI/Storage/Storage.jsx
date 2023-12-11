import React, { useState, useEffect } from "react";
import Axios from "axios";
function Storage() {
    // const bloodInventory = [
    //   { type: "A+", bags: 120 },
    //   { type: "A-", bags: 75 },
    //   { type: "B+", bags: 98 },
    //   { type: "B-", bags: 60 },
    //   { type: "O+", bags: 110 },
    //   { type: "O-", bags: 80 },
    //   { type: "AB+", bags: 70 },
    //   { type: "AB-", bags: 50 },
    // ];

    const [bloodInventory, setBloodInventory] = useState([]);

    useEffect(() => {
        Axios({
            method: "GET",
            url: "http://localhost:2121/getBloodGrouped",
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data);
                setBloodInventory([res.data]);
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
                    {bloodInventory.map((inventory, index) => {
                        // Extract blood type and bags from the object
                        const bloodType = Object.keys(inventory)[0];
                        const bags = inventory[bloodType];

                        return (
                            <tr key={index}>
                                <td>{bloodType}</td>
                                <td>{bags}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Storage