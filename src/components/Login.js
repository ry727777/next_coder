import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <h2>Login</h2>

      <form className="login-form">
        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <span className="link" onClick={()=> navigate("/register")}>Register</span>
      </p>
    </div>
  );
};

export default Login;
