import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Editor from "@monaco-editor/react";
import "../css/JavaBasicQuestion.css";

const JavaBasicQuestion = () => {
  const { id } = useParams();

  const defaultCode = `public class Main {
    public static void main(String[] args) {
        
    }
}`;

  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("");
  const [language, setLanguage] = useState("JAVA");
  const [input, setInput] = useState("");   
  const [activeTab, setActiveTab] = useState("output"); 

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/questions/${id}`)
      .then((res) => setQuestion(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const hasMainMethod = () =>
    code.includes("class") && code.includes("public static void main");

  const handleRun = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/compiler/run",
        {
          language,
          code,
          input: input   
        }
      );

      if (res.data.error) {
        setOutput(res.data.error);
      } else if (res.data.output !== null) {
        setOutput(res.data.output);
      } else {
        setOutput("No output generated.");
      }

      setActiveTab("output");

    } catch (err) {
      setOutput("Server Error");
      setActiveTab("output");
    }
  };

  const handleSubmit = () => {
    if (!hasMainMethod()) {
      setVerdict("❌ Compilation Error");
      return;
    }

    setVerdict("✅ Accepted (Mock Submit)");
    setActiveTab("output");
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="platform-container">

      {/* LEFT SIDE - QUESTION */}
      <div className="question-panel">
        <h2>Q{question.id}. {question.title}</h2>
        <ReactMarkdown>{question.description}</ReactMarkdown>
      </div>

      {/* RIGHT SIDE - IDE */}
      <div className="compiler-panel">

        {/* Top Bar */}
        <div className="editor-header">
          <div className="left">
            <span className="language-tag">Java</span>
          </div>
          <div className="right">
            <button className="run-btn" onClick={handleRun}>
              ▶ Run
            </button>
            <button className="submit-btn" onClick={handleSubmit}>
              ✓ Submit
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="editor-container">
          <Editor
            height="100%"
            defaultLanguage="java"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: "on",
            }}
          />
        </div>

        {/* Bottom Console Section */}
        <div className="console-section">

          {/* Tabs */}
          <div className="console-header">
            <span
              className={activeTab === "input" ? "active-tab" : ""}
              onClick={() => setActiveTab("input")}
            >
              Input
            </span>
            <span
              className={activeTab === "output" ? "active-tab" : ""}
              onClick={() => setActiveTab("output")}
            >
              Output
            </span>
          </div>

          <div className="console-body">
            {activeTab === "input" ? (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter custom input here..."
                className="input-area"
              />
            ) : (
              <>
                <pre>{output || "Program output will appear here..."}</pre>
                {verdict && <strong>{verdict}</strong>}
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default JavaBasicQuestion;