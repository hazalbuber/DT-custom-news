import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Search from '../Search/Search';

const Navbar = ({ user, onLogout }) => {

  const handleLogoutClick = () => {
    onLogout();
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">News</Link>

        <div className="d-flex gap-2 align-items-center">
          <Search />
          <ThemeToggle />

          {user ? (
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={handleLogoutClick}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn btn-outline-primary" to="/signup">Sign Up</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
