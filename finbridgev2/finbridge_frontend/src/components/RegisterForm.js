import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    company_name: '',
    position: '',
    location: '',
    needs: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/', formData);
      console.log('User registered:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="company_name" placeholder="Company Name" onChange={handleChange} />
      <input type="text" name="position" placeholder="Position" onChange={handleChange} />
      <input type="text" name="location" placeholder="Location" onChange={handleChange} />
      <textarea name="needs" placeholder="Needs/Problems" onChange={handleChange}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegisterForm;
