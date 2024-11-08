import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../auth/AuthProvider';
import { Link } from 'react-router-dom';
import Login from './Login';

const Register = () => {
    // creates initial states
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // creates error states for each user input
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // allows to use useNavigate to redirect to link
    const navigate = useNavigate();

    // access axioInstance
    const { axiosInstance } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        // resets error messages
        setNameError('');
        setUsernameError('');
        setEmailError('');
        setPasswordError('');

        // validates password length
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            // prevents form submission
            return;
        }

        try {
            const response = await axiosInstance.post(`/register`, {
                name, username, email, password,
            });

            if (response.status === 201) {
                setMessage('Your account has been created! Redirecting to login...')
                console.log('User registered:', response.data);
                setTimeout(() => {
                    navigate('/login');
                // NOTE: store this in an enviorment variable of project config variable so that it is easier to change in the future.
                }, 2000);
            }
        } catch (error) {
            // set specific error messages based on response
            if (error.response) {
                const data = error.response.data;
                if (data.message.includes('Username already exists')) {
                    setUsernameError('This username is already taken.');
                }
                if (data.message.includes('Email already exists')) {
                    setEmailError('This email is already registered.');
                }
                setMessage(data.message || 'Registration failed. Please try again.')
                console.error('Registration error:', data.error);
            } else {
                setMessage("An error occured. Please try again later.")
                console.error('Error:', error);
            }
        }
    };

  return (
    <Container>
        <h2 data-test="register-header">Register</h2>
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleRegister}>
            <Form.Group controlId="formName"> 
                <Form.Label>Name</Form.Label>
                <Form.Control
                    data-test="register-name-input"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {nameError && <div className="text-danger" data-test="register-name-error">{nameError}</div>}
            </Form.Group>

            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    data-test="register-username-input"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {usernameError && <div className="text-danger" data-test="register-username-error">{usernameError}</div>}
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    data-test="register-email-input"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {emailError && <div className="text-danger" data-test="register-email-error">{emailError}</div>}
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    data-test="register-password-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {passwordError && <div className="text-danger" data-test="register-password-error">{passwordError}</div>}
            </Form.Group>

            <Button variant="primary" type="submit" data-test="register-submit-btn">Register</Button>
            <Button variant="secondary" className="login-btn"data-test="login-btn">
                <Link to="/login" className="login-link">Login to existing account</Link>
            </Button>
        </Form>
    </Container>
    )
}

export default Register;