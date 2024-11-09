// src/LogIn.jsx
import { useState } from 'react';
import styles from './LogIn.module.css';

function LogIn({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose}>&times;</button>
      <h1>Log In</h1>
      <p>
        Welcome back! Please enter your credentials to access your account and continue your search for a teacher.
      </p>
      <div className={styles.inputDiv}>
        <input type="email" placeholder="Email" />
        <div className={styles.passwordInput}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <span onClick={togglePasswordVisibility} className={styles.icon}>
            {showPassword ? (
              <svg width="16" height="16">
                <use xlinkHref="#icon-eye-off" />
              </svg>
            ) : (
              <svg width="16" height="16">
                <use xlinkHref="#icon-eye" />
              </svg>
            )}
          </span>
        </div>
      </div>
      <button>Log In</button>
    </div>
  );
}

export default LogIn;