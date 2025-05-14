import React, { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button
      className={`btn btn-outline-dark ${styles.button}`}
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;

