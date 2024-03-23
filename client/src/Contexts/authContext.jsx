import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (user) => {
        setCurrentUser(user);
        localStorage.setItem('token', user.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('token');
        
    };

    const value = {
        currentUser,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
