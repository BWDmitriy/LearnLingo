import { useEffect, useState } from 'react';
import styles from './Teachers.module.css';
import TeacherCard from '../TeacherCard/TeacherCard';
import { db } from '../../firebaseConfig.js';
import { ref, onValue } from 'firebase/database';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const teachersRef = ref(db, 'teachers');
    const unsubscribe = onValue(teachersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const teachersList = Object.values(data);
        setTeachers(teachersList);
      } else {
        setTeachers([]);
      }
    }, (error) => {
      console.error('Error fetching teachers:', error);
      setError(error);
    });

    return () => unsubscribe();
  }, []);

  if (error) {
    return <div>Error loading teachers: {error.message}</div>;
  }

  return (
    <div className={styles.teachersPage}>
      <div className={styles.filterDiv}>
        <div>
          <label>Languages</label>
          <select>
            <option>French</option>
            <option>English</option>
            <option>German</option>
            <option>Ukrainian</option>
            <option>Polish</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label>Level of knowledge</label>
          <select>
            <option>A1 Beginner</option>
            <option>A2 Elementary</option>
            <option>B1 Intermediate</option>
            <option>B2 Upper-Intermediate</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label>Price</label>
          <select>
            <option>10 $</option>
            <option>20 $</option>
            <option>30 $</option>
            <option>40 $</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      <div className={styles.teacherList}>
        {teachers.map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
      </div>
    </div>
  );
}

export default Teachers;