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

  // State for filters
  const [selectedLanguage, setSelectedLanguage] = useState("French");
  const [selectedLevel, setSelectedLevel] = useState("A1 Beginner");
  const [selectedPrice, setSelectedPrice] = useState("30 $");

  useEffect(() => {
    const teachersRef = ref(db);
    const unsubscribe = onValue(
      teachersRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("Fetched data:", data);
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

  // Filter teachers based on selected options
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesLanguage = teacher.languages.includes(selectedLanguage);
    const matchesLevel = teacher.levels.includes(selectedLevel);
    const matchesPrice = teacher.price_per_hour <= parseInt(selectedPrice);
    return matchesLanguage && matchesLevel && matchesPrice;
  });

  if (error) {
    return <div>Error loading teachers: {error.message}</div>;
  }

  return (
    <div className={styles.teachersPage}>
      <div className={styles.filterDiv}>
        <div>
          <label>Languages</label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option defaultValue>French</option>
            <option>English</option>
            <option>German</option>
            <option>Ukrainian</option>
            <option>Polish</option>
          </select>
        </div>
        <div>
          <label>Level of knowledge</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option defaultValue>A1 Beginner</option>
            <option>A2 Elementary</option>
            <option>B1 Intermediate</option>
            <option>B2 Upper-Intermediate</option>
            <option>C1 Advanced</option>
            <option>C2 Proficient</option>
          </select>
        </div>
        <div>
          <label>Price</label>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option>10 $</option>
            <option>20 $</option>
            <option defaultValue>30 $</option>
            <option>40 $</option>
            <option>50 $</option>
          </select>
        </div>
      </div>
      <div className={styles.teacherList}>
        {filteredTeachers.slice(0, visibleTeachers).map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
      </div>
      {visibleTeachers < teachers.length && (
        <button className={styles.loadMore} onClick={loadMoreTeachers}>
          Load More
        </button>
      )}
    </div>
  );
}

export default Teachers;
