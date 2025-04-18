import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./Register.jsx";
import Challenge from "./Challenge.jsx";
import Login from "./Login.jsx";
import Logs from "./Logs";
import Dashboard from './components/Dashboard.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path='/login' element={<Login />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
