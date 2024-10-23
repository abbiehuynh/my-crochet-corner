import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Logout = () => {
    const navigate = useNavigate();
    const namespacedTokenKey = 'MCC_Token';

    const handleLogout = () => {
        // clears the JWT token from local storage using the namespaced key
        localStorage.removeItem(namespacedTokenKey);
        navigate('/login');
    };

  return (
    <Button onClick={handleLogout}>Logout</Button>

  );
};

export default Logout;