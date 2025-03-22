import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./Register.jsx";
import Challenge from "./Challenge.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/challenge" element={<Challenge />} />
      </Routes>
    </Router>
  )
}

export default App
