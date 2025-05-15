import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import NewsPage from './pages/NewsPage/NewsPage';
import ResultPage from './pages/ResultPage/ResultPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { jwtDecode } from 'jwt-decode';


function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        setUser({ username: data.username }); 
        return true;
      } else {
        alert(data.error || "Login failed");
        return false;
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
      return false;
    }
  };
  
  
  const handleSignUp = async (newUser) => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created! Now login.");
      } else {
        alert(data.error || "Sign-up failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.username });
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<LoginPage onLogin={handleLogin} onSignUp={handleSignUp} />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/news-list" element={<News keyword="technology" />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
