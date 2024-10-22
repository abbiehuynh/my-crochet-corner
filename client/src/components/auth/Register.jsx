import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Form, Button, Container } from 'react-bootstrap';

const Register = () => {
    // creates initial states
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, username, email, password }), // Include email in the request
          });

          const data = await response.json();
      if (response.ok) {
        console.log('User registered:', data);
      } else {
        console.error('Registration error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formName"> {/* New name input */}
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
        </Form.Group>

        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Container>
  )
}

export default Register;