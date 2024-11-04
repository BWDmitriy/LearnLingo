import styles from './Header.module.css';

function Header() {
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
        {/* Replace with your icon */}
        <span>Icon</span>
        <a href="/login">Log in</a>
        <button className={styles.registrationButton}>Registration</button>
      </div>
    </header>
  );
}

export default Header;