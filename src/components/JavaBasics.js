import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/JavaBasics.css";

const JavaBasics = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/questions/filter-with-status", {
        params: { topic: "Java Basics" },
        withCredentials: true
      })
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
      });
  }, []);

  return (
    <div className="basics-container">
      <h2>Java Basics</h2>
      <p className="subtitle">Practice basic Java programming questions</p>

      <div className="question-list">
        {questions.map((q) => (
          <div
            key={q.id}
            className="question-card"
            onClick={() => navigate(`/practice/java/basics/${q.id}`)}
          >
            <h4>{q.title}</h4>

            <div className="meta">
              <span className="level">{q.difficulty}</span>

              <span
                className={`status ${q.status === "SOLVED" ? "solved" : "unsolved"
                  }`}
              >
                {q.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JavaBasics;
