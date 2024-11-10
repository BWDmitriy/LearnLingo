// src/BookTrialLesson.jsx
import styles from "./BookTrialLesson.module.css";
import PropTypes from "prop-types";

function BookTrialLesson({ teacher }) {
  return (
    <div className={styles.container}>
      <h1>Book trial lesson</h1>
      <p>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={styles.trialTeacher}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
        />
        <div>
          <p>Your teacher</p>
          <p>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>
      <h2>What is your main reason for learning English?</h2>
      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            name="learningReason"
            value="Career and business"
          />
          Career and business
        </label>
        <label>
          <input type="radio" name="learningReason" value="Lesson for kids" />
          Lesson for kids
        </label>
        <label>
          <input type="radio" name="learningReason" value="Living abroad" />
          Living abroad
        </label>
        <label>
          <input
            type="radio"
            name="learningReason"
            value="Exams and coursework"
          />
          Exams and coursework
        </label>
        <label>
          <input
            type="radio"
            name="learningReason"
            value="Culture, travel or hobby"
          />
          Culture, travel or hobby
        </label>
      </div>
      <div className={styles.trialInputs}>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Phone number" />
      </div>
      <button className={styles.bookButton}>Book</button>
    </div>
  );
}

BookTrialLesson.propTypes = {
  teacher: PropTypes.func.isRequired,
};

export default BookTrialLesson;
