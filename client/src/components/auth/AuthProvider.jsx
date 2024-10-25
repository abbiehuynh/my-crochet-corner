import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// creates context
const AuthContext = createContext();

// creates token key
const TOKEN_KEY = 'MCC_Token';

const baseURL = import.meta.env.VITE_URL;

// creates an Axios instance
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// intercepts requests to add the authorization header
axiosInstance.interceptors.request.use(config => {
    // retrieves token from local storage
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    // creates states for updating list of projects when new project is added
    const [projectsUpdated, setProjectsUpdated] = useState(false);

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

    // updating project list function
    const updateProjects = () => {
        setProjectsUpdated((prev) => {
            // checks if projects are being updated
            console.log('Toggling projectsUpdated:', !prev);
            return !prev;
    });
}

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, updateProjects, projectsUpdated, axiosInstance }}>
        {children}
    </AuthContext.Provider>
    )
};

// hook for using auth context
export const useAuth = () => useContext(AuthContext);
