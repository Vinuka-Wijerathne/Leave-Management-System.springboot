import React from 'react';
import companyLogo from './leaveManagement.png'; // Import your company logo image
import './AdminNavBar.css'; // Import your custom CSS for the navigation bar

const AddNavigationBar = () => {
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
        <li className="nav-item"><a href="adduser" className="nav-link">Add User</a></li>
        <li className="nav-item"><a href="admin" className="nav-link">Leave Request Dashboard</a></li>
        <li className="nav-item"><a href="userlist" className="nav-link">View Users</a></li> {/* Corrected typo */}
      </ul>
      <button className="logout-btn" onClick={handleLogout}>Logout</button> {/* Add onClick event for logout */}
    </nav>
  );
};

export default AddNavigationBar;
