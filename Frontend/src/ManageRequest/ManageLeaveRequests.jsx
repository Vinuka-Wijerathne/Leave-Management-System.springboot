import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import AddNavigationBar from '../AdminNavBar/AdminNavBar';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AdminLeaveRequestsPanel.css';

const AdminLeaveRequestsPanel = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processingAction, setProcessingAction] = useState('');

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/leave-requests/all`);
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map(request => ({
          ...request,
          dateTime: formatDate(request.dateTime)
        }));
        formattedData.sort((a, b) => {
          if (a.status === 'Pending' && b.status !== 'Pending') {
            return -1;
          } else if (a.status !== 'Pending' && b.status === 'Pending') {
            return 1;
          } else {
            return 0;
          }
        });
        setLeaveRequests(formattedData);
      } else {
        console.error('Failed to fetch leave requests');
      }
    } catch (error) {
      console.error('Error occurred while fetching leave requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  const handleApprove = async (id, email) => {
    setProcessingAction('Approving');
    try {
      const response = await fetch(`http://localhost:8080/api/leave-requests/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'approved' })
      });

      if (response.ok) {
        console.log('Leave request approved successfully');
        sendEmail(email, 'Leave Request Approved', 'Your leave request has been approved.');
        setLeaveRequests(prevRequests => prevRequests.map(request =>
          request.id === id ? { ...request, status: 'Approved' } : request
        ));
      } else {
        console.error('Failed to approve leave request');
      }
    } catch (error) {
      console.error('Error occurred while approving leave request:', error);
    } finally {
      setProcessingAction('');
    }
  };

  const handleDelete = async (id) => {
    setProcessingAction('Deleting');
    try {
      const response = await fetch(`http://localhost:8080/api/leave-requests/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('Leave request deleted successfully');
        setLeaveRequests(prevRequests => prevRequests.filter(request => request.id !== id));
      } else {
        console.error('Failed to delete leave request');
      }
    } catch (error) {
      console.error('Error occurred while deleting leave request:', error);
    } finally {
      setProcessingAction('');
    }
  };

  const handleDeny = async (id, email) => {
    setProcessingAction('Denying');
    try {
      const response = await fetch(`http://localhost:8080/api/leave-requests/${id}/deny`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'denied' })
      });

      if (response.ok) {
        console.log('Leave request denied successfully');
        sendEmail(email, 'Leave Request Denied', 'Your leave request has been denied.');
        setLeaveRequests(prevRequests => prevRequests.map(request =>
          request.id === id ? { ...request, status: 'Denied' } : request
        ));
      } else {
        console.error('Failed to deny leave request');
      }
    } catch (error) {
      console.error('Error occurred while denying leave request:', error);
    } finally {
      setProcessingAction('');
    }
  };

  const sendEmail = async (email, subject, message) => {
    try {
      const response = await fetch('http://localhost:8080/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, subject, message })
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error occurred while sending email:', error);
    }
  };

  return (
    <div className="container">
      <AddNavigationBar />
      <h2 className="text-center mb-4 mt-3" style={{ color: 'white' }}>Admin Leave Requests</h2>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        leaveRequests.map((request) => (
          <div key={request.id} className="leave-request border rounded p-3 mb-3" style={{ width: '60%', margin: '0 auto', color: 'white' }}>
            {(request.status === 'Approved' || request.status === 'Denied') && (
              <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDelete(request.id)} />
            )}
            <h3>Name: {request.name}</h3>
            <p>Email: {request.email}</p>
            <p>Date & Time: {request.dateTime}</p>
            <div className="description">
              <p>{request.description}</p>
            </div>
            <p>Status: <span className={`status ${request.status === 'Pending' ? 'pending' : request.status}`}>{request.status || 'Pending'}</span></p>
            <div className="d-flex justify-content-end">
              <Button variant="success" className="me-2" onClick={() => handleApprove(request.id, request.email)} disabled={processingAction === 'Approving'}>Approve</Button>
              <Button variant="danger" onClick={() => handleDeny(request.id, request.email)} disabled={processingAction === 'Denying'}>Deny</Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminLeaveRequestsPanel;
