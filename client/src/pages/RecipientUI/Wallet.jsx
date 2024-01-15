import React, { useState, useEffect } from "react";
import Axios from "axios";
import styles from "../../components/Styles/Wallet.module.css";

function Wallet() {
  const [wallet, setWallet] = useState({
    currentMoney: 0,
    // ... other wallet state properties
  });
  const [message, setMessage] = useState("");
  const [amountToAdd, setAmountToAdd] = useState(0); // State to manage the input amount
  const apiUrl = import.meta.env.VITE_API_BASE;
  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = () => {
    Axios({
      method: "GET",
      url: apiUrl + "/recipient/currentRecipient", // Corrected the URL
      withCredentials: true,
    })
      .then((res) => {
        setWallet(res.data);
      })
      .catch((error) => console.error(error));
  };

  const handleDeposit = () => {
    if (amountToAdd <= 0) {
      setMessage("Please enter a valid amount to deposit.");
      return;
    }

    Axios({
      method: "POST",
      url: apiUrl + "/recipient/addMoney",
      withCredentials: true,
      data: {
        addedMoney: amountToAdd,
      },
    })
      .then((res) => {
        setMessage(res.data);
        fetchWalletData();
        setAmountToAdd(0); // Reset the deposit amount
      })
      .catch((error) => {
        console.error(error);
        setMessage("Internal error");
      });
  };

  return (
    <div className={styles.walletContainer}>
      <h1 className={styles.title}>Wallet</h1>
      <div className={styles.walletDetails}>
        <p>
          <strong>Current Money:</strong> {wallet.currentMoney}
        </p>
        <input
          type="number"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(e.target.value)}
          className={styles.depositInput}
        />
        <button className={styles.depositButton} onClick={handleDeposit}>
          Deposit Money
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Wallet;
