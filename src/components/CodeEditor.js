import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

const CodeEditor = ({ visibleCases = [], hiddenCases = [] }) => {
  const [code, setCode] = useState(`#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    cout << n * n << endl;
    return 0;
}`);
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const languageIds = {
    cpp: 54, // Judge0 language_id for C++ (GCC 9.2.0)
    python: 71,
    java: 62,
  };

  const runCode = async (testCases) => {
    let allResults = [];
    for (let i = 0; i < testCases.length; i++) {
      const test = testCases[i];
      try {
        const res = await axios.post(
          JUDGE0_URL,
          {
            source_code: code,
            language_id: languageIds[language],
            stdin: test.input,
          },
          {
            headers: {
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
              "x-rapidapi-key": "<YOUR_RAPIDAPI_KEY>", // <-- Replace this
              "content-type": "application/json",
            },
          }
        );

        const result = res.data;
        const actualOutput = result.stdout || result.stderr || "No output";
        const expected = test.expected.trim();
        const verdict =
          actualOutput.trim() === expected.trim()
            ? "✅ Passed"
            : `❌ Failed\nExpected: ${expected}\nGot: ${actualOutput}`;

        allResults.push(`Test ${i + 1}: ${verdict}`);
      } catch (err) {
        allResults.push(`Test ${i + 1}: ❌ Error executing code`);
      }
    }
    return allResults.join("\n\n");
  };

  const handleRun = async () => {
    setIsLoading(true);
    setOutput("Running visible test cases...");
    const resultText = await runCode(visibleCases);
    setOutput(resultText);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setOutput("Running hidden test cases...");
    const resultText = await runCode(hiddenCases);
    setOutput(resultText);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-2">
        <select
          className="border p-2 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>

        <div className="space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleRun}
            disabled={isLoading}
          >
            Run
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <Editor
        height="60vh"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
      />

      {/* Output Panel */}
      <div className="mt-3 bg-black text-green-400 p-3 rounded h-48 overflow-auto">
        <h3 className="font-semibold">Output:</h3>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;