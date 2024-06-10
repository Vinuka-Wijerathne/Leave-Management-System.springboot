import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import NavigationBar from '../UserNavBar/UserNavBar';

const LeaveRequestPanel = () => {
  // State to store leave requests
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Function to fetch leave requests for the current user
  const fetchUserLeaveRequests = async () => {
    try {
      // Make a request to the backend to fetch leave requests for the current user
      const response = await fetch('http://localhost:8080/api/user-leave-requests');
      if (response.ok) {
        // If the request is successful, parse the response and set the leave requests state
        const data = await response.json();
        setLeaveRequests(data.leaveRequests);
      } else {
        console.error('Failed to fetch leave requests');
      }
    } catch (error) {
      console.error('Error occurred while fetching leave requests:', error);
    }
  };

  // Fetch leave requests when the component mounts
  useEffect(() => {
    fetchUserLeaveRequests();
  }, []);

  const handleEdit = (id) => {
    // Handle edit logic here
    console.log(`Editing leave request with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    console.log(`Deleting leave request with ID: ${id}`);
  };

  return (
    <div className="container">
      <NavigationBar/>
      <h2 className="text-center mb-4 mt-3 ">Leave Requests</h2>
      {leaveRequests.map((request) => (
        <div key={request.id} className="leave-request border rounded p-3 mb-3" style={{ width: '60%', margin: '0 auto' }}>
          <h3>Name: {request.name}</h3>
          <p>Date: {request.date}</p>
          <p>Time: {request.time}</p>
          <p>Description: {request.description}</p>
          <p>Status: {request.status}</p>
          <div className="d-flex justify-content-end">
            <Button variant="success" className="me-2" onClick={() => handleEdit(request.id)}>Edit</Button>
            <Button variant="danger" onClick={() => handleDelete(request.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveRequestPanel;
