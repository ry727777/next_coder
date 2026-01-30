import React from "react";
import { Link, useParams } from "react-router-dom";
import data from "../data/questions.json";

const QuestionList = () => {
  const { topic } = useParams();
  const questions = data[topic] || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{topic} Questions</h1>
      {questions.length === 0 && <p>No questions yet.</p>}
      {questions.map((q) => (
        <Link
          key={q.id}
          to={`/question/${topic}/${q.id}`}
          className="block p-3 bg-gray-100 hover:bg-gray-200 rounded mb-2"
        >
          {q.title}
        </Link>
      ))}
    </div>
  );
};

export default QuestionList;
