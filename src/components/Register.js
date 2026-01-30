import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registered successfully (dummy)");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          required
        />

        <input
          type="email"
          placeholder="Email address"
          required
        />

        <input
          type="password"
          placeholder="Password"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <span className="link" onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
