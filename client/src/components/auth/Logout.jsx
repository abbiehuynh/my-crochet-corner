import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Button from 'react-bootstrap/Button';

const Logout = () => {
    const navigate = useNavigate();
    // accesses the logout function from use context
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

  return (
    <Button onClick={handleLogout}>Logout</Button>

  );
};

export default Logout;