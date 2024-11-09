// src/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Registration from '../Registration/Registration';
import LogIn from '../LogIn/LogIn';

function Header() {
   const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false);

  const openRegistration = () => setIsRegistrationOpen(true);
  const closeRegistration = () => setIsRegistrationOpen(false);

  const openLogIn = () => setIsLogInOpen(true);
  const closeLogIn = () => setIsLogInOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        {/* Replace with your icon */}
        <span>Icon</span>
        <p>LearnLingo</p>
      </div>
      <div className={styles.headerLinks}>
        <a href="/">Home</a>
        <a href="/teachers">Teachers</a>
      </div>
      <div className={styles.headerAuth}>

         <button onClick={openLogIn}> <span>Icon</span>Log In</button>
        <button className={styles.registrationButton}  onClick={openRegistration}>Registration</button>
      </div>
      {isRegistrationOpen && (
        <div className={styles.modalBackdrop} onClick={closeRegistration}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Registration onClose={closeRegistration} />
          </div>
        </div>
      )}
      {isLogInOpen && (
        <div className={styles.modalBackdrop} onClick={closeLogIn}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <LogIn onClose={closeLogIn} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;