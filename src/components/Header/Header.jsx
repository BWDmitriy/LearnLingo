import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./Header.module.css";
import Registration from "../Registration/Registration";
import LogIn from "../LogIn/LogIn";
import { auth } from "../../firebaseConfig.js";
import sprite from "../../assets/icons.svg";
import { useLocation } from "react-router-dom";
import iziToast from "izitoast";

function Header() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const openRegistration = () => setIsRegistrationOpen(true);
  const closeRegistration = () => setIsRegistrationOpen(false);

  const openLogIn = () => setIsLogInOpen(true);
  const closeLogIn = () => setIsLogInOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      iziToast.success({
        title: "Success",
        message: "User logged out successfully",
      });
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: `Error logging out: ${error.message}`,
      });
    }
  };

  if (loadingAuth) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <svg width="28" height="28">
          <use xlinkHref={`${sprite}#icon-ukraine`} />
        </svg>
        <p>LearnLingo</p>
      </div>
      <div className={styles.headerLinks}>
        <a
          href="/"
          className={location.pathname === "/" ? styles.activeLink : ""}
        >
          Home
        </a>
        <a
          href="/teachers"
          className={location.pathname === "/teachers" ? styles.activeLink : ""}
        >
          Teachers
        </a>
      </div>
      <div className={styles.headerAuth}>
        {user ? (
          <>
            <div className={styles.headerLinks}>
              <a
                href="/favorites"
                className={
                  location.pathname === "/favorites" ? styles.activeLink : ""
                }
              >
                Favorites
              </a>
            </div>
            <a className={styles.loginButton} onClick={handleLogout}>
              <svg width="20" height="20">
                <use xlinkHref={`${sprite}#icon-login`} />
              </svg>
              &nbsp;Log Out
            </a>
          </>
        ) : (
          <>
            <a className={styles.loginButton} onClick={openLogIn}>
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
          </>
        )}
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
