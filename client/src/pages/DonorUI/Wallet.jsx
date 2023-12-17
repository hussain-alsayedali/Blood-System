import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styles from '../../components/Styles/Wallet.module.css';

function Wallet() {
    const [wallet, setWallet] = useState({
        currentMoney: 0,
        // ... other wallet state properties
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchWalletData();
    }, []);

    const fetchWalletData = () => {
        Axios({
            method: 'GET',
            url: 'http://localhost:2121/donor/currentDonor',
            withCredentials: true,
        })
            .then((res) => {
                setWallet(res.data);
            })
            .catch((error) => console.error(error));
    };

    const handleWithdraw = () => {
        if (wallet.currentMoney === 0) {
            setMessage('You have no money to take.');
            return;
        }

        Axios({
            method: 'POST',
            url: 'http://localhost:2121/donor/getAllMoney',
            withCredentials: true,
        })
            .then((res) => {
                setMessage(res.data);
                fetchWalletData();
            })
            .catch((error) => {
                console.error(error);
                setMessage('Internal error');
            });
    };

    return (
        <div className={styles.walletContainer}>
            <h1 className={styles.title}>Wallet</h1>
            <div className={styles.walletDetails}>
                <p>
                    <strong>Current Money:</strong> {wallet.currentMoney}
                </p>
            </div>
            {wallet.currentMoney > 0 ? (
                <button className={styles.withdrawButton} onClick={handleWithdraw}>
                    Withdraw All Money
                </button>
            ) : (
                <p>{message || 'You have no money to take.'}</p>
            )}
        </div>
    );
}

export default Wallet;