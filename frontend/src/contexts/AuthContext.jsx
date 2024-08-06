// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false)

  const baseUrl = import.meta.env.VITE_API_BASEURL;

  useEffect(() => {
    // Check if token exists in localStorage on initial load
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchUserData(savedToken);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      setLoading(true)
      const response = await fetch(`${baseUrl}/api/v1/users/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data.user);
      console.log(data)
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    } finally {
      setLoading(false)
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await fetch(`${baseUrl}/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        fetchUserData(data.token);
      }
      redirect('/')
    } catch (error) {
      console.error('Login error:', error);
    } finally{
      setLoading(false)
    }
  };


  
  const registerUser = async (name, username, email, password) => {
    try {
      setLoading(true)
      const response = await fetch(`${baseUrl}/api/v1/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, username, email, password }),
      });
      const data = await response.json();
      console.log('registered', data)
    } catch (error) {
      console.error('Register error:', error);
    } finally{
      setLoading(false)
    }
  };


  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
