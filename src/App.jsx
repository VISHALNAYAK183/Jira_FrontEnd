import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login"
import './App.css'
import Dashboard from './pages/dashboard';
import CompanyPage from './pages/CompanyPage';

function App() {
  const [count, setCount] = useState(0)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<CompanyPage />} />
      </Routes>
    </Router>
  );
}

export default App
