import TeacherCard from "../TeacherCard/TeacherCard";
import { db } from "../../firebaseConfig.js";
import { useEffect, useState } from "react";
import styles from "./Teachers.module.css";
import { ref, onValue } from "firebase/database";
import Loader from "../Loader/Loader.jsx";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [visibleTeachers, setVisibleTeachers] = useState(4);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teachersRef = ref(db);
    const unsubscribe = onValue(
      teachersRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const teachersList = Object.values(data);
          setTeachers(teachersList);
        } else {
          setTeachers([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching teachers:", error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredData = teachers.filter((teacher) => {
    const matchesLanguage = teacher.languages.includes(selectedLanguage);
    const matchesLevel = teacher.levels.includes(selectedLevel);
    const matchesPrice = teacher.price_per_hour <= parseInt(selectedPrice);
    return matchesLanguage && matchesLevel && matchesPrice;
  });

  console.log(filteredData);
  const loadMoreTeachers = () => {
    setVisibleTeachers((prev) => prev + 4);
  };

  if (loading) {
    return <Loader />;
  }

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
            <option>French</option>
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
            <option>A1 Beginner</option>
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
            <option>30 $</option>
            <option>40 $</option>
            <option>50 $</option>
          </select>
        </div>
      </div>
      <div className={styles.teacherList}>
        {filteredData.length > 0
          ? filteredData
              .slice(0, visibleTeachers)
              .map((teacher, index) => (
                <TeacherCard key={index} teacher={teacher} />
              ))
          : teachers
              .slice(0, visibleTeachers)
              .map((teacher, index) => (
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
