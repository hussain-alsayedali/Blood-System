import React, { useState } from 'react';
import styles from '../../components/Styles/Wallet.module.css'

const Wallet = () => {
    // Dummy data for demonstration
    const [balance, setBalance] = useState(100.0);
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const handleWithdraw = () => {
        // Logic to initiate the withdrawal process
        // This would involve validation, API call, etc.
        if (parseFloat(withdrawAmount) <= balance && parseFloat(withdrawAmount) > 0) {
            alert(`Withdrawal of $${withdrawAmount} initiated!`);
            // After successful withdrawal, update the balance
            setBalance(balance - parseFloat(withdrawAmount));
            // Reset withdrawal amount
            setWithdrawAmount('');
        } else {
            alert(`Invalid withdrawal amount.`);
        }
    };

    return (
        <div className={styles.walletContainer}>
            <h1 className={styles.walletHeader}>Wallet</h1>
            <div className={styles.walletInfo}>
                <div>Balance:</div>
                <div className={styles.moneyAmount}>${balance.toFixed(2)}</div>
            </div>
            <div className={styles.withdrawSection}>
                <input
                    type="number"
                    className={styles.withdrawInput}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Amount to withdraw"
                />
                <button className={styles.withdrawButton} onClick={handleWithdraw}>
                    Withdraw
                </button>
            </div>
        </div>
    );
};

export default Wallet;