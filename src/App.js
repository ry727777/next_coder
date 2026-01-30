import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import QuestionList from "./components/QuestionList";
import QuestionPage from "./components/QuestionPage";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import JavaPractice from "./components/JavaPractice";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/practice/java" element={<JavaPractice />} />
      </Routes>
    </Router>
  );
}

export default App;