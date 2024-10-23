import React, { createContext, useContext, useState } from 'react';

// creates context
const AuthContext = createContext();

// creates token key
const TOKEN_KEY = 'MCC_Token';

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
        setProjectsUpdated((prev) => !prev);
    }


  return (
    <AuthContext.Provider value={{ token, userId, login, logout, updateProjects }}>
        {children}
    </AuthContext.Provider>
    )
};

// hook for using auth context
export const useAuth = () => useContext(AuthContext);
