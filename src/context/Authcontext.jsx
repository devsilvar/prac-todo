import { createContext, useState, useEffect } from 'react';

import { base_url } from '../library/api';

import axios from 'axios';

const AuthContext = createContext();

const Authprovider = ({ children }) => {
  // const { refetch } = UseCustom(`${base_url}/get-all-todo`, 'GET');
  const [authToken, setauthToken] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [user, setUser] = useState(null);

  /**
   * Logs in a user by sending a POST request to the server.
   * Retrieves the user's authentication token from the response.
  
  */
  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    if (storedToken) {
      setauthToken(storedToken);
      // Optionally, fetch user data or verify the token here
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem('token');
    setauthToken(null);
    setUser(null);
  };

  const login = async (username, password) => {
    setloading(true);
    const data = {
      username: username,
      password: password,
    };
    try {
      // Send a POST request to the login endpoint
      const response = await axios.post(`${base_url}/login`, data);
      // Add login data here, e.g., username and password;
      // refetch();
      const { token, user } = response.data;

      setauthToken(token);
      sessionStorage.setItem('authToken', token);
      setUser(user);

      // Handle the response, e.g., store auth token
      return { token, user };
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Login error:', error);
      console.log(error.response.data.message);
      seterror(error.response.data.message);
      throw error;
    } finally {
      setTimeout(() => {
        setloading(false);
      }, 3000);
    }
  };

  const signup = async (username, password, email) => {
    const data = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${base_url}/signup`, data);
      const { token, user } = response.data;
      return response.data;
    } catch (error) {
      console.log('sign up Error', error);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    if (storedToken) {
      setauthToken(storedToken);
      // Ideally, verify the token and fetch user data here
    }
    setloading(false);
  }, [loading]);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        user,
        login,
        signup,
        logout,
        error,
        loading,
        setloading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Authprovider, AuthContext };
