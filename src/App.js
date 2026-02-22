import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import QuestionList from "./components/QuestionList";
import QuestionPage from "./components/QuestionPage";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import JavaPractice from "./components/JavaPractice";
import JavaBasics from "./components/JavaBasics";
import JavaBasicQuestion from "./components/JavaBasicQuestion";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/practice/java" element={<JavaPractice />} />
        <Route path="/practice/java/basics" element={<JavaBasics />} />
        <Route
          path="/practice/java/basics/:id"
          element={<JavaBasicQuestion />}
        />
      </Routes>
    </Router>
  );
}

export default App;