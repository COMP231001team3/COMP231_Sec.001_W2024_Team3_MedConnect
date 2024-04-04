/*import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Check for stored token when component mounts
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setCurrentUser({ token }); // Set current user with token
        }
    }, []);

    const login = async (user) => {
        try {
            setCurrentUser(user);
            localStorage.setItem('token', user.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        } catch (error) {
            console.error('Error logging in:', error);
            throw new Error('Login failed');
        }
    };

    const logout = async () => {
        try {
            setCurrentUser(null);
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization']; // Remove Authorization header
        } catch (error) {
            console.error('Error logging out:', error);
            throw new Error('Logout failed');
        }
    };

    const value = {
        currentUser,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
*/

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

