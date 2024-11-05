import styles from './TeacherCard.module.css';

function TeacherCard({ teacher }) {
  const {
    avatar_url,
    name,
    surname,
    languages,
    lessons_done,
    rating,
    price_per_hour,
    lesson_info,
    conditions,
    levels,
  } = teacher;

  return (
    <div className={styles.teacherDiv}>
      <div className={styles.teacherPic}>
        <img src={avatar_url} alt={`${name} ${surname}`} />
      </div>
      <div className={styles.teacherDescription}>
        <div className={styles.teacherStatsDiv}>
          <div className={styles.teacherName}>
            <p>Languages</p>
            <h2>{name} {surname}</h2>
          </div>
          <div className={styles.teacherStats}>
            <p>Lessons online</p>
            <div className={styles.divider}></div>
            <p>Lessons done: {lessons_done}</p>
            <div className={styles.divider}></div>
            <p>Rating: {rating}</p>
            <div className={styles.divider}></div>
            <p>Price / 1 hour: {price_per_hour}$</p>
          </div>
        </div>
        <div>
          <p>Speaks: {languages.join(', ')}</p>
          <p>Lesson Info: {lesson_info}</p>
          <p>Conditions: {conditions.join(', ')}</p>
        </div>
        <div>
          <a href="#">Read more</a>
        </div>
        <div>
          <p>Levels: {levels.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default TeacherCard;