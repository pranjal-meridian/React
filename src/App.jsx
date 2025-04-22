import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./Register.jsx";
import Challenge from "./Challenge.jsx";
import Login from "./Login.jsx";
import Logs from "./Logs";
import Dashboard from './components/Dashboard.jsx';
import AdminRoute from './components/AdminRoute';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path='/login' element={<Login />} />
        <Route path="/logs" element={
          <AdminRoute>
            <Logs />
          </AdminRoute>
        } />

        <Route path="/dashboard" element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
