import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import CopyrightBar from '../CopyrightBar/CopyrightBar';
import companyLogo from './leaveManagement.png'; // Import your company logo image
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
  
    // Data to be sent to the backend
    const userData = {
      email: email,
      password: password
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (response.ok) {
        const responseData = await response.json(); // Get response as JSON
        const role = responseData.role; // Get user's role from response
  
        // Redirect based on user's role
        if (role === 'admin') {
          // Redirect to the admin page if the role is admin
          navigate('/admin');
        } else {
          // Redirect to the dashboard page if the role is not admin
          navigate('/form');
        }
      } else {
        // Handle errors
        const errorMessage = await response.text(); // Get error message as plain text
        console.error('Login failed:', errorMessage);
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
    }
  };
  
  

  return (
    <div>
      <div className="login-page">
        <div className="login-form">
          <img src={companyLogo} alt="Company Logo" className="company-logo" /> {/* Add the company logo */}
          <h2 className="heading">Welcome to Our Leave Management System</h2> {/* Add heading */}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="label1">Email</label> {/* Change label text */}
              <input
                type="text"
                id="email"
                className="form-control1"
                placeholder="Enter email" // Change placeholder
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="label2">Password</label> {/* Change label text */}
              <input
                type="password"
                id="password"
                className="form-control2"
                placeholder="Enter password" // Change placeholder
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
       {/* Add the CopyrightBar component <CopyrightBar />*/}
    </div>
  );
}

export default LoginPage;
