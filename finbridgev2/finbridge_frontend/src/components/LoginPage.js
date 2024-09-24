import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';


function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission to log in to the dashboard.
   * 
   * 1. Prevents default form submission behavior.
   * 2. Makes a POST request to the API's token endpoint with the username and password.
   * 3. If the request is successful, stores the access token in local storage and
   *    navigates to the dashboard page.
   * 4. If the request fails, logs an error message to the console.
   * 
   * @param {Event} e - The form submission event.
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', credentials);
      localStorage.setItem('token', response.data.access);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default LoginPage;
