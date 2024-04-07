import React, { createContext, useContext, useState, useEffect } from 'react';
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
    const email = localStorage.getItem('email');

    if (token && email) {
      fetchUserData(token, email)
        .then(userData => {
          setCurrentUser(userData); // Set the entire user object
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const login = async user => {
    try {
      setCurrentUser(user); // Set the entire user object
      localStorage.setItem('token', user.token);
      localStorage.setItem('email', user.email);
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
      localStorage.removeItem('email');
      delete axios.defaults.headers.common['Authorization']; // Remove Authorization header
    } catch (error) {
      console.error('Error logging out:', error);
      throw new Error('Logout failed');
    }
  };

  // Fetch user data based on the token and email
  async function fetchUserData(token, email) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Fetch patient data
      const patientResponse = await axios.get(`http://localhost:5000/patients/email/${email}`, config);
      if (patientResponse.status === 200) {
        return patientResponse.data; // Assuming the response contains patient data
      } else {
        // If patient data not found, fetch doctor data
      const doctorResponse = await axios.get(`http://localhost:5000/doctors/email/${email}`, config);
      if (doctorResponse.status === 200) {
        return doctorResponse.data; // Assuming the response contains doctor data
      }
      }

      // If patient data not found, fetch doctor data
      const doctorResponse = await axios.get(`http://localhost:5000/doctors/email/${email}`, config);
      if (doctorResponse.status === 200) {
        return doctorResponse.data; // Assuming the response contains doctor data
      }

      throw new Error('User data not found');
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  const contextValue = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;