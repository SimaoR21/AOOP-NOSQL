// src/pages/RegisterPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Failed to register');
        return;
      }

      // Auto-login after registration
      const loginRes = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!loginRes.ok) {
        setError('Failed to login after registration');
        return;
      }

      const { token } = await loginRes.json();
      setToken(token);
      navigate('/movies');
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '80px auto',
        padding: 20,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: 8,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#222' }}>Register</h2>

      {error && (
        <p
          style={{
            color: '#b00020',
            backgroundColor: '#fddede',
            padding: '10px 15px',
            borderRadius: 4,
            marginBottom: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
          role="alert"
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{
            padding: 12,
            marginBottom: 15,
            borderRadius: 5,
            border: '1px solid #ccc',
            fontSize: 16,
            fontFamily: 'inherit',
          }}
          autoComplete="name"
          aria-label="Name"
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            padding: 12,
            marginBottom: 15,
            borderRadius: 5,
            border: '1px solid #ccc',
            fontSize: 16,
            fontFamily: 'inherit',
          }}
          autoComplete="email"
          aria-label="Email"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            padding: 12,
            marginBottom: 20,
            borderRadius: 5,
            border: '1px solid #ccc',
            fontSize: 16,
            fontFamily: 'inherit',
          }}
          autoComplete="new-password"
          aria-label="Password"
        />

        <button
          type="submit"
          style={{
            padding: 12,
            backgroundColor: '#007BFF',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
            fontSize: 16,
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#007BFF')}
          aria-label="Register"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
