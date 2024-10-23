import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Register = () => {
    // creates initial states
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    // allows to use useNavigate to redirect to link
    const navigate = useNavigate();

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
                setMessage('Your account has been created! Redirecting to login...')
                console.log('User registered:', data);
                setTimeout(() => {
                    navigate('/login');
                // wait for 2 seconds before executing
                // NOTE: how to store this in an enviorment variable of project config variable so that it is easier to change in the future.
                }, 2000);

            } else {
                setMessage(data.message || 'Registration failed. Please try again.')
                console.error('Registration error:', data.error);
            }

        } catch (error) {
            setMessage("An error occured. Please try again later.")
            console.error('Error:', error);
        }
    };

  return (
    <Container>
      <h2>Register</h2>
      {message && <Alert variant="success">{message}</Alert>}
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