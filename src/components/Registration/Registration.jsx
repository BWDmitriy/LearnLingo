// src/Registration.jsx
import React from 'react';
import styles from './Registration.module.css';

function Registration({ onClose }) {
  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose}>&times;</button>
      <h1>Registration</h1>
      <p>
        Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.
      </p>
      <div className={styles.inputDiv}>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
      </div>
      <button>Sign Up</button>
    </div>
  );
}

export default Registration;