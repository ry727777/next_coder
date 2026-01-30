import React from "react";
import { useParams } from "react-router-dom";
import data from "../data/questions.json";
import CodeEditor from "./CodeEditor";

const QuestionPage = () => {
  const { topic, id } = useParams();
  const question = data[topic]?.find((q) => q.id === parseInt(id));

  if (!question) return <p>Question not found.</p>;

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="p-6 overflow-auto bg-gray-50 border-r">
        <h2 className="text-xl font-bold mb-2">{question.title}</h2>
        <p className="mb-4">{question.description}</p>
      </div>
      <div className="p-4">
        <CodeEditor
          visibleCases={question.visible_cases}
          hiddenCases={question.hidden_cases}
        />
      </div>
    </div>
  );
};

export default QuestionPage;
