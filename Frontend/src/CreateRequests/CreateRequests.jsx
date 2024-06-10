import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import { Formik } from 'formik';

import './CreateRequests.css';
import NavigationBar from '../UserNavBar/UserNavBar';

const LeaveApplicationForm = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const initialValues = {
    name: '',
    email: '',
    description: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    description: Yup.string().required('Description is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('http://localhost:8080/api/leave-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        setSuccessMessage('Leave request created successfully');
        resetForm();
      } else {
        console.error('Failed to create leave request');
      }
    } catch (error) {
      console.error('Error occurred while creating leave request:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="leave-form">
          <h2 style={{ color: 'white' }}>Leave Application Form</h2>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control small-input ${
                      touched.name && errors.name ? 'is-invalid' : ''
                    }`}
                  />
                  {touched.name && errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control small-input ${
                      touched.email && errors.email ? 'is-invalid' : ''
                    }`}
                  />
                  {touched.email && errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </Form.Group>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter a description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control description ${
                      touched.description && errors.description
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {touched.description && errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </Form.Group>
                <Button
                  variant="primary"
                  className="mt-3"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
