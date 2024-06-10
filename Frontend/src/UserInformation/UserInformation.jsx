import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddNavigationBar from '../AdminNavBar/AdminNavBar';
import EditUserForm from '../EditUser/EditUser';

const UserInformation = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State to store the user being edited

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/all');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Set the editingUser state with the selected user data
    navigateToEditUser(); // Navigate to the edit user page
  };

  const updateUser = async (userData) => {
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
      fetchUsers(); // Refresh user list after update
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  const navigateToEditUser = () => {
    // Define your navigation logic here
    // For example, you can use window.location.href or a router library
  };

  if (editingUser) {
    return <EditUserForm user={editingUser} updateUser={updateUser} />;
  }

  return (
    <div className="container">
      <AddNavigationBar />
      <h2 style={{ color: 'white' }}>User List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
                {' '}
                <Button variant="primary" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserInformation;
