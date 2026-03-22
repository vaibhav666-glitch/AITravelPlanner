"use client";

import { useState } from "react";
import InputField from "../common/InputField";

const LoginForm = ({ onSubmit }: any) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("yo nigga")
    onSubmit(form, isSignup);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <InputField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <InputField
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        type="password"
      />

      <button 
      className="bg-blue-500 "
      onClick={handleSubmit}>
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <p
        className="mt-4 text-blue-500 cursor-pointer"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default LoginForm;