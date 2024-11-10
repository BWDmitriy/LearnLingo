// src/components/Registration/Registration.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import styles from "./Registration.module.css";
import sprite from "../../assets/icons.svg";
import PropTypes from "prop-types";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Registration({ onClose }) {
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
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log("User registered successfully");
      onClose(); // Close the registration modal on success
    } catch (error) {
      console.error("Error registering:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>
      <h1>Registration</h1>
      <p>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.inputDiv}>
        <input type="text" placeholder="Name" {...register("name")} />
        <p className={styles.error}>{errors.name?.message}</p>
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
        <button className={styles.regButton} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

Registration.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Registration;
