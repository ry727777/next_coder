import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Editor from "@monaco-editor/react";
import "../css/JavaBasicQuestion.css";
import Split from "react-split";

axios.defaults.withCredentials = true;

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
  const [activeTab, setActiveTab] = useState("input");
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // 🔥 Fetch question
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/questions/${id}`)
      .then((res) => setQuestion(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // 🔥 Lock background scroll when loading
  useEffect(() => {
    if (runLoading || submitLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [runLoading, submitLoading]);

  const handleRun = async () => {
    setRunLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/compiler/run",
        {
          language,
          code,
          problemId: id,
        }
      );

      setResults(res.data.results);
      setSummary({
        total: res.data.total,
        passed: res.data.passed,
        verdict: res.data.verdict,
      });

      setActiveTab("output");
    } catch (err) {
      setOutput("Server Error");
    } finally {
      setRunLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/compiler/submit",
        {
          language,
          code,
          problemId: id,
        }
      );

      setResults(res.data.results);
      setSummary({
        total: res.data.total,
        passed: res.data.passed,
        verdict: res.data.verdict,
      });

      setActiveTab("output");
    } catch (err) {
      setOutput("Server Error");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!question) return <div>Loading...</div>;

  return (
    <>
      <Split
        className="platform-container"
        sizes={[50, 50]}
        minSize={300}
        gutterSize={10}
        direction="horizontal"
      >
        {/* LEFT PANEL */}
        <div className="question-panel">
          <h2>Q{question.id}. {question.title}</h2>
          <ReactMarkdown>{question.description}</ReactMarkdown>

          <div className="sample-section">
            <h3>Sample Test Cases</h3>

            {question.testCases
              ?.filter((tc) => tc.sample)
              .map((tc, index) => (
                <div key={index} className="sample-box">
                  <p><strong>Example {index + 1}:</strong></p>

                  <p><strong>Input:</strong></p>
                  <pre>{tc.inputData}</pre>

                  <p><strong>Output:</strong></p>
                  <pre>{tc.expectedOutput}</pre>
                </div>
              ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="compiler-panel">

          {/* Top Bar */}
          <div className="editor-header">
            <div className="left">
              <span className="language-tag">Java</span>
            </div>
            <div className="right">
              <button
                className="run-btn"
                onClick={handleRun}
                disabled={runLoading || submitLoading}
              >
                {runLoading ? "Running..." : "▶ Run"}
              </button>

              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={runLoading || submitLoading}
              >
                {submitLoading ? "Submitting..." : "✓ Submit"}
              </button>
            </div>
          </div>

          {/* Editor */}
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

          {/* Console */}
          <div className="console-section">

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
              {activeTab === "input" && (
                <div className="input-area">

                  {question.testCases && question.testCases.length > 0 ? (

                    question.testCases
                      .filter(tc => tc.sample)
                      .map((tc, index) => (
                        <pre key={index}>
                          <strong>Test Case {index + 1}:</strong>
                          {"\n"}
                          {tc.inputData}
                        </pre>
                      ))

                  ) : (
                    <p>No sample test cases available</p>
                  )}

                </div>
              )}
              {activeTab === "output" && (
                <>
                  {summary && summary.verdict === "COMPILATION_ERROR" ? (

                    <div className="error-box">
                      <h3>❌ Compilation Error</h3>
                      <pre className="error-text">
                        {results[0]?.actual}
                      </pre>
                    </div>

                  ) : summary && summary.verdict === "RUNTIME_ERROR" ? (

                    <div className="error-box">
                      <h3>💥 Runtime Error</h3>
                      <pre className="error-text">
                        {results[0]?.actual}
                      </pre>
                    </div>

                  ) : (
                    <>
                      {summary && (
                        <div className="summary-box">
                          <strong>
                            Passed: {summary.passed} / {summary.total} | Verdict: {summary.verdict}
                          </strong>
                        </div>
                      )}

                      {results.map((r, index) => (
                        <div key={index} className="result-box">
                          <strong>
                            Test Case {index + 1} - {r.status}
                          </strong>

                          <pre>Input: {r.input}</pre>
                          <pre>Expected: {r.expected}</pre>
                          <pre>Actual: {r.actual}</pre>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </Split>

      {/* 🔥 FULL SCREEN OVERLAY */}
      {(runLoading || submitLoading) && (
        <div className="global-overlay">
          <div className="spinner"></div>
          <p className="loading-text">
            {runLoading ? "Running your code..." : "Submitting your solution..."}
          </p>
        </div>
      )}
    </>
  );
};

export default JavaBasicQuestion;