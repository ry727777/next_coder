import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/JavaPractice.css";

const JavaPractice = () => {
  const navigate = useNavigate();

  return (
    <div className="java-container">
      <h2>Java Practice</h2>
      <p className="subtitle">
        Master Java from basics to advanced concepts
      </p>

      <div className="java-topics">
        <div
          className="java-card"
          onClick={() => navigate("/practice/java/basics")}
        >
          <h3>Java Basics</h3>
          <p>Variables, Data Types, Input/Output</p>
        </div>

        <div
          className="java-card"
          onClick={() => navigate("/practice/java/control")}
        >
          <h3>Control Statements</h3>
          <p>if, switch, loops</p>
        </div>

        <div
          className="java-card"
          onClick={() => navigate("/practice/java/oops")}
        >
          <h3>OOP Concepts</h3>
          <p>Class, Object, Inheritance</p>
        </div>

        <div
          className="java-card"
          onClick={() => navigate("/practice/java/arrays")}
        >
          <h3>Arrays</h3>
          <p>1D, 2D, operations</p>
        </div>

        <div
          className="java-card"
          onClick={() => navigate("/practice/java/strings")}
        >
          <h3>Strings</h3>
          <p>String, StringBuilder</p>
        </div>

        <div
          className="java-card"
          onClick={() => navigate("/practice/java/exceptions")}
        >
          <h3>Exception Handling</h3>
          <p>try, catch, finally</p>
        </div>

        <div
          className="java-card"
          onClick={() => navigate("/practice/java/collections")}
        >
          <h3>Collections</h3>
          <p>List, Set, Map</p>
        </div>
      </div>
    </div>
  );
};

export default JavaPractice;
