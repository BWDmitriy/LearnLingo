// src/components/LogIn/LogIn.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import styles from "./LogIn.module.css";
import sprite from "../../assets/icons.svg";
import PropTypes from "prop-types";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LogIn({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("User logged in successfully");
      onClose(); // Close the login modal on success
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>
      <h1>Log In</h1>
      <p>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.inputDiv}>
        <input type="email" placeholder="Email" {...register("email")} />
        <p className={styles.error}>{errors.email?.message}</p>
        <div className={styles.passwordInput}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          <span onClick={togglePasswordVisibility} className={styles.icon}>
            {showPassword ? (
              <svg width="32" height="32">
                <use xlinkHref={`${sprite}#icon-eye`} />
              </svg>
            ) : (
              <svg width="32" height="32">
                <use xlinkHref={`${sprite}#icon-eye-off`} />
              </svg>
            )}
          </span>
        </div>
        <p className={styles.error}>{errors.password?.message}</p>
        <button className={styles.loginButton} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}
LogIn.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LogIn;
