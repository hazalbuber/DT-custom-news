import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import News from '../../components/News/News';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    fetch("http://localhost:3000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
          setIsLoggedIn(true);
        }
      })
      .catch(err => {
        console.error("Error fetching user info:", err);
      });
  }, []);
  

  return (
    <div>
      <Sidebar />
      <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>
        <strong>{isLoggedIn ? "Selected for You" : "Top News"}</strong>
      </h2>

      {isLoggedIn && categories.length > 0 ? (
        categories.map((cat) => (
          <div key={cat}>
            <h4 style={{ marginLeft: '1rem' }}>{cat.toUpperCase()}</h4>
            <News keyword={cat} />
          </div>
        ))
      ) : (
        <News keyword="general" />
      )}
    </div>
  );
};

export default HomePage;

