import React from 'react';
import { Navigate } from 'react-router-dom';
 
const ProtectedRoute = ({ element }) => {
    const namespacedTokenKey = 'MCC_Token';
    const token = localStorage.getItem(namespacedTokenKey);

    // if the token doesn't exist, redirect to the login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    // if the tokoen exists, render the request component
    return element;

};


export default ProtectedRoute;