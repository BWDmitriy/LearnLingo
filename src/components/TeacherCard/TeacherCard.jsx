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
              Rating: {teacher.rating.toFixed(1)}
            </p>
            <div className={styles.divider}></div>
            <p>Price / 1 hour: {teacher.price_per_hour}$</p>
            <a onClick={toggleFavorite} className={styles.favoriteButton}>
              <svg width="16" height="16">
                <use
                  xlinkHref={
                    isFavorite
                      ? `${sprite}#icon-fav-selected`
                      : `${sprite}#icon-fav`
                  }
                />
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.teacherInfo}>
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

        {!isExpanded && (
          <div>
            <a className={styles.readMore} onClick={toggleExpand}>
              Read more
            </a>
          </div>
        )}

        {isExpanded && (
          <div className={styles.teacherDetails}>
            <p className={styles.teacherExperience}>{teacher.experience}</p>
            <div className={styles.reviewsDiv}>
              {teacher.reviews.map((review, index) => (
                <div key={index} className={styles.reviewer}>
                  <div className={styles.reviewProfile}>
                    <div className={styles.reviewerPhoto}>
                      {review.reviewer_photo ? (
                        <img src={review.reviewer_photo} alt={review.name} />
                      ) : (
                        <span>{review.reviewer_name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <p>{review.reviewer_name}</p>
                      <p>
                        <svg width="16" height="16">
                          <use xlinkHref={`${sprite}#icon-star`} />
                        </svg>
                        {review.reviewer_rating}.0
                      </p>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
            <div className={styles.levels}>
              {teacher.levels.map((level, index) => (
                <div
                  key={index}
                  className={
                    index === 0 ? styles.firstLevel : styles.otherLevels
                  }
                >
                  #{level}
                </div>
              ))}
            </div>
            <button
              className={styles.bookTrialButton}
              onClick={openBookingModal}
            >
              Book trial lesson
            </button>
          </div>
        )}
        {!isExpanded && (
          <div className={styles.levels}>
            {teacher.levels.map((level, index) => (
              <div
                key={index}
                className={index === 0 ? styles.firstLevel : styles.otherLevels}
              >
                #{level}
              </div>
            ))}
          </div>
        )}
      </div>
      {isBookingModalOpen && (
        <div className={styles.modalBackdrop} onClick={closeBookingModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <BookTrialLesson teacher={teacher} />
            <button className={styles.closeButton} onClick={closeBookingModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherCard;
