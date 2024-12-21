// src/LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {    
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Both fields are required!');
      return;
    }

    setError('');  // Clear error

    // Simulating an API call for login (you can replace it with your real API)
    console.log('Login Attempt', { email, password });

    // After successful login, you can redirect the user or show a success message
    alert('Login successful!');
    
  };

  return (
    <div className="login-form-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
      <h2> Sales Rep. Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" onClick={() => navigate('/orders')} className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
