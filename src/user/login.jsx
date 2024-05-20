import React, { useState } from 'react';
import './auth.css';
import TextField from '@mui/material/TextField';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate the form fields
    const newErrors = {};

    if (email.trim() === '') {
      newErrors.email = 'Please enter your email address';
    }

    if (password.trim() === '') {
      newErrors.password = 'Please enter a password';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Perform login logic here
    // ...

    // Log the form details in the console
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <h4>Login</h4>
          <div className="input-group login-input-group input-group-icon">
            <TextField
              className='login-input'
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="input-icon">
              <i className="fa fa-envelope" />
            </div>
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}
          <div className="input-group login-input-group input-group-icon">
            <TextField
              className='login-input'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="input-icon">
              <i className="fa fa-key" />
            </div>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <br /> 
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
}