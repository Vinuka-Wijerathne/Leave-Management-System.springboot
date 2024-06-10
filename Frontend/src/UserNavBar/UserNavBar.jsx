import React from 'react';
import companyLogo from './leaveManagement.png'; // Import your company logo image
import './UserNavBar.css'; // Import your custom CSS for the navigation bar

const NavigationBar = () => {
  const handleLogout = () => {
    // Perform logout actions here, such as clearing user data from localStorage or session storage
    // Then navigate back to the login page
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={companyLogo} alt="Company Logo" className="logo" /> {/* Add the logo here */}
        Leave Management System
      </div>
      <ul className="nav-links">
        <li className="nav-item"><a href="form" className="nav-link">Leave Request</a></li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>Logout</button> {/* Add onClick event for logout */}
    </nav>
  );
};

export default NavigationBar;
