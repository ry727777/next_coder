import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>Welcome 👋</h2>
      <p>What do you want to practice today?</p>

      <div className="dashboard-cards">
        <div
          className="dashboard-card"
          onClick={() => navigate("/practice/dsa")}
        >
          <h3>DSA</h3>
          <p>Arrays, Strings, Trees, Graphs</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/practice/java")}
        >
          <h3>Java</h3>
          <p>Basic to Advanced Problems</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/practice/cpp")}
        >
          <h3>C++</h3>
          <p>Logic & Problem Solving</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/practice/python")}
        >
          <h3>Python</h3>
          <p>Beginner Friendly</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
