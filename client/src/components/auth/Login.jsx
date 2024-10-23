import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useAuth } from './AuthProvider';

const Login = () => {
    // access the login function from useContext
    const { login, token } = useAuth();

    // creates initials states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // resets error state
        setError('');

        // checks if username and password are provided
        if (!username || !password ) {
            setError('Username and password are required');
            return;
        }

        try {
           const response = await fetch(`${import.meta.env.VITE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
           });

           const data = await response.json();
           console.log('API Response:', data);

           if (response.ok) {
                // passes both token and userId to login function
                login({ newToken: data.token, id: data.userId });
                // navigates to the home page after successful login
                navigate('/home')
                console.log({ username }, 'User ID:', data.userId, 'Logged in');
           } else {
                setError(data.message || 'Invalid username and/or password');
                console.error('Invalid username and/or password', data.message);
           }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };

  return (
    <Container>
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
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
            <Button variant="primary" type="submit">Login</Button>
            <Button>
                <Link to="/register" style={{ textDecoration: "none", color: "white"}}>Create Account</Link>
            </Button>
        </Form>
        {error && <div className="text-danger mt-3">{error}</div>}
        {token && <div>Logged in! </div>}
    </Container>
  );
};

export default Login;