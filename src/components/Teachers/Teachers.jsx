// src/Teachers.jsx
import TeacherCard from "../TeacherCard/TeacherCard";
import { db } from "../../firebaseConfig.js";

import { useEffect, useState } from "react";
import styles from "./Teachers.module.css";
import { ref, onValue } from "firebase/database";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [visibleTeachers, setVisibleTeachers] = useState(4);
  const [error, setError] = useState(null);

  useEffect(() => {
    const teachersRef = ref(db);
    const unsubscribe = onValue(
      teachersRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("Fetched data:", data); // Add this line to log the fetched data
        if (data) {
          const teachersList = Object.values(data);
          setTeachers(teachersList);
        } else {
          setTeachers([]);
        }
      },
      (error) => {
        console.error("Error fetching teachers:", error);
        setError(error);
      }
    );

    return () => unsubscribe();
  }, []);

  const loadMoreTeachers = () => {
    setVisibleTeachers((prev) => prev + 4);
  };

  if (error) {
    return <div>Error loading teachers: {error.message}</div>;
  }

  return (
    <div className={styles.teachersPage}>
      <div className={styles.teacherList}>
        {teachers.slice(0, visibleTeachers).map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
      </div>
      {visibleTeachers < teachers.length && (
        <button onClick={loadMoreTeachers}>Load More</button>
      )}
    </div>
  );
}

export default Teachers;
