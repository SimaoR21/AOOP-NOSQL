// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import MovieListPage from './Pages/MovieListPage';
import MovieDetailsPage from './Pages/MovieDetailsPage';

export const AuthContext = React.createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    padding: '15px 0',
    backgroundColor: '#222',
    fontFamily: 'Arial, sans-serif',
  };

  const linkStyle = {
    color: '#eee',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };

  const linkHoverStyle = {
    backgroundColor: '#444',
  };

  const buttonStyle = {
    padding: '8px 14px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#ff5555',
    color: 'white',
    transition: 'background-color 0.3s ease',
  };

  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router>
        <nav style={navStyle}>
          <Link
            to="/movies"
            style={{
              ...linkStyle,
              ...(hoveredLink === 'movies' ? linkHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredLink('movies')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Movies
          </Link>

          {token ? (
            <button
              onClick={() => setToken(null)}
              style={buttonStyle}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#cc4444')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ff5555')}
              aria-label="Logout"
              title="Logout"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  ...linkStyle,
                  ...(hoveredLink === 'login' ? linkHoverStyle : {}),
                }}
                onMouseEnter={() => setHoveredLink('login')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  ...linkStyle,
                  ...(hoveredLink === 'register' ? linkHoverStyle : {}),
                }}
                onMouseEnter={() => setHoveredLink('register')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Register
              </Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/movies" element={<MovieListPage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
