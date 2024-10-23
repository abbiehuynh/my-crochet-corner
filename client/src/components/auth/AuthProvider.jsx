import React, { createContext, useContext, useState } from 'react';

// creates context
const AuthContext = createContext();

// creates token key
const TOKEN_KEY = 'MCC_Token';

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const login = (newToken) => {
        setToken({ newToken });
        localStorage.setItem(TOKEN_KEY, newToken);
    }

    const logout = () => {
        // clears token from local stroage
        setToken(null);
        localStorage.removeItem(TOKEN_KEY);
    };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
        {children}
    </AuthContext.Provider>
    )
};

// hook for using auth context
export const useAuth = () => useContext(AuthContext);
