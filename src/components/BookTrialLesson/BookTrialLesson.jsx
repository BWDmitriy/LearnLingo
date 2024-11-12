import styles from "./BookTrialLesson.module.css";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import iziToast from "izitoast";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  date: yup.date().required("Date is required"),
  learningReason: yup.string().required("Please select a reason for learning"),
});

function BookTrialLesson({ teacher, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    iziToast.success({
      title: "Success",
      message: "Trial lesson booked successfully!",
    });
    onClose();
  };

  return (
    <div className={styles.container}>
      <h1>Book trial lesson</h1>
      <p>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div className={styles.trialTeacher}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
        />
        <div>
          <p>Your teacher</p>
          <p>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>
      <h2>What is your main reason for learning English?</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.trialInputs}>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="learningReason"
              value="Career and business"
              {...register("learningReason")}
            />
            Career and business
          </label>
          <label>
            <input
              type="radio"
              name="learningReason"
              value="Lesson for kids"
              {...register("learningReason")}
            />
            Lesson for kids
          </label>
          <label>
            <input
              type="radio"
              name="learningReason"
              value="Living abroad"
              {...register("learningReason")}
            />
            Living abroad
          </label>
          <label>
            <input
              type="radio"
              name="learningReason"
              value="Exams and coursework"
              {...register("learningReason")}
            />
            Exams and coursework
          </label>
          <label>
            <input
              type="radio"
              name="learningReason"
              value="Culture, travel or hobby"
              {...register("learningReason")}
            />
            Culture, travel or hobby
          </label>
        </div>
        <p
          className={`${styles.error} ${
            errors.learningReason ? styles.visible : ""
          }`}
        >
          {errors.learningReason?.message}
        </p>
        <input type="text" placeholder="Name" {...register("name")} />
        <p className={`${styles.error} ${errors.name ? styles.visible : ""}`}>
          {errors.name?.message}
        </p>

        <input type="email" placeholder="Email" {...register("email")} />
        <p className={`${styles.error} ${errors.email ? styles.visible : ""}`}>
          {errors.email?.message}
        </p>

        <input type="date" {...register("date")} />
        <p className={`${styles.error} ${errors.date ? styles.visible : ""}`}>
          Valid date is required
        </p>

        <button type="submit" className={styles.bookButton}>
          Book
        </button>
      </form>
    </div>
  );
}

BookTrialLesson.propTypes = {
  teacher: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookTrialLesson;
