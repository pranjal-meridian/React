import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/login', { email, password })
      .then((response) => {
        if (response.data.status === "success") {
            cookie.set('email', email);
            navigate("/challenge");
        } else {
            alert(response.data.message);
        }
      })
      .catch((error) => {
        alert("Invalid credentials. Please try again.");
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-xl shadow-xl space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}

export default Login;
