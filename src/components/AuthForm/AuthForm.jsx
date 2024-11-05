// src/AuthForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth } from "../../firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function AuthForm({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Register or login user
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      // Or for login: await signInWithEmailAndPassword(auth, data.email, data.password);
      onClose();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email</label>
            <input type="email" {...register("email")} />
            <p>{errors.email?.message}</p>
          </div>
          <div>
            <label>Password</label>
            <input type="password" {...register("password")} />
            <p>{errors.password?.message}</p>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
