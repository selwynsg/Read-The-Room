import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./RegisterPage.css";

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    console.log(email, password);
    const response = await fetch(`http://localhost:28017/info/Email/${email}`, {
      method: 'GET',
    });
    if (response.status === 404) {
      try {
        const postData = {
          Email: email,
          Password: password
        };
          await fetch('http://localhost:28017/info/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });
        navigate('/');
        console.log("hi");
      }
      catch (error) {
        setError('Failed to register');
      }
    } else {
      setError('There is an account already registered');
    }
  };

  return (
    <div className="canvas-register-container">
    <div className="canvas-register-box">
      <h1 className="canvas-register-title">Register an Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>myNortheastern Username:</strong>
          <input className="canvas-input" type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          <strong>myNortheastern Password:</strong>
          <input className="canvas-input" type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <label>
          <strong>Confirm Password:</strong>
          <input className="canvas-input" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </label>
        {error && <div className="canvas-error">{error}</div>}
        <button className="canvas-submit" type="submit">Register</button>
        <div>
          <a className="canvas-login" href="/">
            Already have an account? Login here!
          </a>
        </div>
      </form>
    </div>
  </div>
);
}

export default RegisterPage;