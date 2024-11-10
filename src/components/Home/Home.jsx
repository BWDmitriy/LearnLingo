import styles from "./Home.module.css";
import headImage from "../../img/head.png";
import macImage from "../../img/mac-yellow.png";

function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.descriptionDiv}>
          <h1>
            Unlock your potential with the best <span>language</span> tutors
          </h1>
          <p>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button>Get started</button>
        </div>
        <div className={styles.imageDiv}>
          <img src={headImage} alt="Head" className={styles.headImage} />
          <img src={macImage} alt="Mac" className={styles.macImage} />
        </div>
      </main>
      <footer className={styles.footer}>
        <div>
          <h3>32,000 +</h3>
          <p>Experienced tutors</p>
        </div>
        <div>
          <h3>300,000 +</h3>
          <p>5-star tutor reviews</p>
        </div>
        <div>
          <h3>120 +</h3>
          <p>Subjects taught</p>
        </div>
        <div>
          <h3>200 +</h3>
          <p>Tutor nationalities</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
