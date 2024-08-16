import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      setToken(response.data.token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
