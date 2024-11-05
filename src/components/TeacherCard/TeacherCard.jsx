// src/TeacherCard.jsx
import React from "react";
import styles from "./TeacherCard.module.css";

function TeacherCard({ teacher }) {
  if (!teacher) {
    return null; // Return null if no teacher data is provided
  }

  return (
    <div className={styles.teacherDiv}>
      <div className={styles.teacherPic}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
        />
      </div>
      <div className={styles.teacherDescription}>
        <div className={styles.teacherStatsDiv}>
          <div className={styles.teacherName}>
            <p>Languages</p>
            <h2>
              {teacher.name} {teacher.surname}
            </h2>
          </div>
          <div className={styles.teacherStats}>
            <p>Lessons online</p>
            <div className={styles.divider}></div>
            <p>Lessons done: {teacher.lessons_done}</p>
            <div className={styles.divider}></div>
            <p>Rating: {teacher.rating}</p>
            <div className={styles.divider}></div>
            <p>Price / 1 hour: {teacher.price_per_hour}$</p>
          </div>
        </div>
        <div>
          <p>Speaks: {teacher.languages.join(", ")}</p>
          <p>Lesson Info: {teacher.lesson_info}</p>
          <p>Conditions: {teacher.conditions.join(", ")}</p>
        </div>
        <div>
          <button>♥</button>
          <a href="#">Read more</a>
        </div>
        <div>
          <p>Levels: {teacher.levels.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}

export default TeacherCard;
