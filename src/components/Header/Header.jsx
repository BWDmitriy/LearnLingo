// src/Header.jsx
import { useState } from "react";
import styles from "./Header.module.css";
import Registration from "../Registration/Registration";
import LogIn from "../LogIn/LogIn";
import sprite from "../../assets/icons.svg";

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
        <svg width="28" height="28">
          <use xlinkHref={`${sprite}#icon-ukraine`} />
        </svg>
        <p>LearnLingo</p>
      </div>
      <div className={styles.headerLinks}>
        <a href="/">Home</a>
        <a href="/teachers">Teachers</a>
      </div>
      <div className={styles.headerAuth}>
        <a onClick={openLogIn}>
          <svg width="20" height="20">
            <use xlinkHref={`${sprite}#icon-login`} />
          </svg>
          &nbsp;Log In
        </a>
        <button
          className={styles.registrationButton}
          onClick={openRegistration}
        >
          Registration
        </button>
      </div>
      {isRegistrationOpen && (
        <div className={styles.modalBackdrop} onClick={closeRegistration}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Registration onClose={closeRegistration} />
          </div>
        </div>
      )}
      {isLogInOpen && (
        <div className={styles.modalBackdrop} onClick={closeLogIn}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <LogIn onClose={closeLogIn} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
