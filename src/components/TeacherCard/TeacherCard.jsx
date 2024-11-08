// src/TeacherCard.jsx
import { useState } from "react";
import styles from "./TeacherCard.module.css";
import BookTrialLesson from "../BookTrialLesson/BookTrialLesson";
import sprite from "../../assets/icons.svg";

function TeacherCard({ teacher }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Optionally, handle favorite logic here (e.g., save to localStorage or Firebase)
  };

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
            <p>
              <svg width="16" height="16">
                <use xlinkHref={`${sprite}#icon-book`} />
              </svg>
              Lessons online
            </p>
            <div className={styles.divider}></div>
            <p>Lessons done: {teacher.lessons_done}</p>
            <div className={styles.divider}></div>
            <p>
              <svg width="16" height="16">
                <use xlinkHref={`${sprite}#icon-star`} />
              </svg>
              Rating: {teacher.rating}
            </p>
            <div className={styles.divider}></div>
            <p>Price / 1 hour: {teacher.price_per_hour}$</p>
            <button onClick={toggleFavorite} className={styles.favoriteButton}>
              <svg width="16" height="16" fill={isFavorite ? "red" : "grey"}>
                <use xlinkHref={`${sprite}#icon-heart`} />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <p>
            <span className={styles.teacherCardSpan}>Speaks:</span>{" "}
            {teacher.languages.join(", ")}
          </p>
          <p>
            <span className={styles.teacherCardSpan}>Lesson Info:</span>{" "}
            {teacher.lesson_info}
          </p>
          <p>
            <span className={styles.teacherCardSpan}>Conditions:</span>{" "}
            {teacher.conditions.join(", ")}
          </p>
        </div>
        <div>
          <a className={styles.readMore} onClick={toggleExpand}>
            Read more
          </a>
        </div>
        {isExpanded && (
          <div>
            <p
              style={{
                fontFamily: "var(--font-family)",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "150%",
                color: "#121417",
              }}
            >
              {teacher.experience}
            </p>
            <div className={styles.reviewsDiv}>
              {teacher.reviews.map((review, index) => (
                <div key={index} className={styles.reviewer}>
                  <div className={styles.reviewProfile}>
                    <img src="placeholder" alt="Profile" />
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-family)",
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "150%",
                          color: "#8a8a89",
                        }}
                      >
                        {review.name}
                      </p>
                      <p>
                        <svg width="16" height="16">
                          <use xlinkHref={`${sprite}#icon-star`} />
                        </svg>
                        {review.rating}
                      </p>
                    </div>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "150%",
                      color: "#121417",
                    }}
                  >
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
            <button onClick={openBookingModal}>Book trial lesson</button>
          </div>
        )}
      </div>
      {isBookingModalOpen && (
        <div className={styles.modalBackdrop} onClick={closeBookingModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <BookTrialLesson teacher={teacher} />
            <button className={styles.closeButton} onClick={closeBookingModal}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherCard;
