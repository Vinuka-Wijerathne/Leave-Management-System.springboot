import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap'; // Import Alert from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddUserPage.css'; // Import the CSS file
import AddNavigationBar from '../AdminNavBar/AdminNavBar';

const AddUserPage = () => {
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'user' // Default role is 'user'
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      // Clear form after successful submission
      setUserData({
        email: '',
        username: '',
        password: '',
        role: 'user'
      });
      setSuccessMessage('User added successfully'); // Set success message
      console.log('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  return (
    <div className="container">
        <AddNavigationBar></AddNavigationBar>
      <h2>Add New User</h2>
      {successMessage && ( // Render success message if it exists
        <Alert variant="success">{successMessage}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            className="input-field" // Add the input-field class
          />
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
            className="input-field" // Add the input-field class
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            className="input-field" // Add the input-field class
          />
        </Form.Group>
        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="input-field" // Add the input-field class
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button">
          Add User
        </Button>
      </Form>
    </div>
  );
};

export default AddUserPage;
