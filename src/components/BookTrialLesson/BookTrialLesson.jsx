// src/BookTrialLesson.jsx
import React from 'react';
import styles from './BookTrialLesson.module.css';

function BookTrialLesson({ teacher }) {
  return (
    <div className={styles.container}>
      <h1>Book trial lesson</h1>
      <p>
        Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={styles.trialTeacher}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
        />
        <div>
          <p>Your teacher</p>
          <p>{teacher.name} {teacher.surname}</p>
        </div>
      </div>
      <h2>What is your main reason for learning English?</h2>
      <select>
        <option>Career and business</option>
        <option>Lesson for kids</option>
        <option>Living abroad</option>
        <option>Exams and coursework</option>
        <option>Culture, travel or hobby</option>
      </select>
      <div className={styles.trialInputs}>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Phone number" />
      </div>
      <button className="bookButton">Book</button>
    </div>
  );
}

export default BookTrialLesson;