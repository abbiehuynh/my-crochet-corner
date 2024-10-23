import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
 
const ProtectedRoute = ({ element }) => {
    const { token } = useAuth();

    // if the token doesn't exist, redirect to the login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    // if the token exists, render the request component
    return element;
};


export default ProtectedRoute;