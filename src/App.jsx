import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login"
import './App.css'
import Dashboard from './pages/dashboard';
import CompanyPage from './pages/CompanyPage';
import AddProject from "./pages/AddProject";
function App() {
  const [count, setCount] = useState(0)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<CompanyPage />} />
         <Route path="/AddProject" element={<AddProject />} />
      </Routes>
    </Router>
  );
}

export default App
