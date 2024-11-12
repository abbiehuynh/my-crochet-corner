import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// creates context
const AuthContext = createContext();

// creates token key
const TOKEN_KEY = 'MCC_Token';

// creates an Axios instance
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// intercepts requests to add the authorization header
axiosInstance.interceptors.request.use(
    config => {
        // retrieves token from local storage
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, error => {
        console.error('Axios request error:', error);
        return Promise.reject(error);
    }
);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    // login function
    const login = (data) => {
        const { newToken, id } = data;
        setToken(newToken);
        setUserId(id);
        localStorage.setItem(TOKEN_KEY, newToken);
    }

    // logout function
    const logout = () => {
        // clears token and userId from local stroage
        setToken(null);
        setUserId(null);
        localStorage.removeItem(TOKEN_KEY);
    };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, axiosInstance }}>
        {children}
    </AuthContext.Provider>
    );
};

// hook for using auth context
export const useAuth = () => useContext(AuthContext);
