import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'; // Import Alert component
import './EditUserForm.css'; // Import the CSS file
import AddNavigationBar from '../AdminNavBar/AdminNavBar';

const EditUserForm = ({ user, updateUser, navigateBack }) => {
  const [userData, setUserData] = useState(user);
  const [updateSuccess, setUpdateSuccess] = useState(false); // State variable for update success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    // Reset update success message when user makes changes
    setUpdateSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      updateUser(userData); // Update local state with new user data
      setUpdateSuccess(true); // Set update success state to true
      // Navigate back to user list page after successful update
      navigateBack('/userlist');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <div>
      <AddNavigationBar/>
      <div className="edit-user-form-container">
        <h2 style={{ color: 'white' }}>Edit User</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail" className="edit-user-form-group">
            <Form.Label className="edit-user-form-label">Email address</Form.Label>
            <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} className="edit-user-form-control" />
          </Form.Group>

          <Form.Group controlId="formBasicUsername" className="edit-user-form-group">
            <Form.Label className="edit-user-form-label">Username</Form.Label>
            <Form.Control type="text" name="username" value={userData.username} onChange={handleChange} className="edit-user-form-control" />
          </Form.Group>

          <Form.Group controlId="formBasicRole" className="edit-user-form-group">
            <Form.Label className="edit-user-form-label">Role</Form.Label>
            <Form.Control as="select" name="role" value={userData.role} onChange={handleChange} className="edit-user-form-control">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="edit-user-btn-primary">
            Update
          </Button>
          {updateSuccess && ( // Render success message if update is successful
            <Alert variant="success" className="mt-3">User updated successfully</Alert>
          )}
        </Form>
      </div>
    </div>
  );
};

export default EditUserForm;
