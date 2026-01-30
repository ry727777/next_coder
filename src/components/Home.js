import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">DSA Practice</h2>
        <div className="nav-links">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Practice DSA & Programming</h1>
        <p>
          Simple and beginner-friendly platform to practice
          Data Structures and Programming Languages.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/login")}
          >
            Start Practicing
          </button>
          <button
            className="secondary-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-card">
          <h3>DSA Topics</h3>
          <p>Arrays, Strings, Stack, Queue, Trees</p>
        </div>

        <div className="feature-card">
          <h3>Languages</h3>
          <p>Java, C++, Python</p>
        </div>

        <div className="feature-card">
          <h3>Beginner Friendly</h3>
          <p>Easy problems with clear explanations</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 DSA Practice Platform</p>
      </footer>
    </div>
  );
};

export default Home;
