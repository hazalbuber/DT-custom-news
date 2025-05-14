import React, { useState } from "react";
import styles from './LoginPage.module.css';
import CategorySelector from "../../components/CategorySelector/CategorySelector";

const LoginPage = ({ onLogin, onSignUp }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSignUp = async () => {
    if (!username || !password) {
      alert("Please fill in all fields!");
      return;
    }
  
    if (selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }
  
    const newUser = { username, password, categories: selectedCategories };
  
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("Account created! Please log in.");
        setIsSignUp(false);
      } else {
        alert(data.error || "Sign-up failed");
      }
    } catch (err) {
      alert("Network error");
      console.error(err);
    }
  };
  
  const handleLogin = async () => {
    if (username && password) {
      try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          alert("Successfully logged in!");
          window.location.href = "/";
        } else {
          alert(data.error || "Login failed");
        }
      } catch (err) {
        alert("Network error");
        console.error(err);
      }
    } else {
      alert("Please fill in the username and password fields!");
    }
  };

  return (
    <div className={`login-page ${styles.pageContainer}`}>

      <div className={styles.formContainer}>
        {isSignUp ? (
          <div className={styles.formBox}>
            <h2 className={styles.formTitle}>Sign Up</h2>
            <div className={styles.formGroup}>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className={styles.formInput}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <CategorySelector selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
            <button className={styles.formButton} onClick={handleSignUp}>
              Create Account
            </button>
            <p className={styles.formText}>
              Already have an account?{" "}
              <button
                className={styles.switchButton}
                onClick={() => setIsSignUp(false)}
              >
                Login
              </button>
            </p>
          </div>
        ) : (
          <div className={styles.formBox}>
            <h2 className={styles.formTitle}>Login</h2>
            <div className={styles.formGroup}>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className={styles.formInput}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className={styles.formButton} onClick={handleLogin}>
              Login
            </button>
            <p className={styles.formText}>
              Don't have an account yet?{" "}
              <button
                className={styles.switchButton}
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </p>
            
          </div>
        )}
      </div>

    </div>
  );
};

export default LoginPage;
