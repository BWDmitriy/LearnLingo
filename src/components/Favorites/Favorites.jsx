import { useState, useEffect } from "react";
import TeacherCard from "../TeacherCard/TeacherCard";
import styles from "./Favorites.module.css";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const favoriteIndices =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const teachersRef = ref(db);

      const unsubscribe = onValue(
        teachersRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const teachersList = Object.values(data);
            const filteredTeachers = teachersList.filter((_, index) =>
              favoriteIndices.includes(index)
            );
            setFavorites(filteredTeachers);
          } else {
            setFavorites([]);
          }
        },
        (error) => {
          console.error("Error fetching teachers:", error);
          setError(error);
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to view your favorites.</div>;
  }

  if (error) {
    return <div>Error loading favorites: {error.message}</div>;
  }

  return (
    <div className={styles.favoritesPage}>
      <h1>Your Favorites</h1>
      <div className={styles.teacherList}>
        {favorites.length > 0 ? (
          favorites.map((teacher, index, favorite) => (
            <TeacherCard key={index} teacher={teacher} favorite={`yes`} />
          ))
        ) : (
          <p>No favorite teachers found.</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
