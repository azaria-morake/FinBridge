// src/components/LandingPage.js

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #FFF5E6;
  min-height: 100vh;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  color: #FF8C00;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #4A4A4A;
  margin-bottom: 2rem;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background-color: #FF8C00;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #E67300;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 100px;
`;

const LandingPage = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    company_name: '',
    position: '',
    company_location: '',
    needs_problems: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register/', formData);
      alert('Registration successful!');
      setShowRegisterForm(false);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <LandingPageContainer>
      <Logo>FinBridge</Logo>
      <Description>
        Empowering SMMEs with innovative financial solutions to navigate challenges and thrive in today's dynamic business landscape.
      </Description>
      <Button onClick={() => window.location.href = '/dashboard'}>Sign In</Button>
      <Button onClick={() => setShowRegisterForm(!showRegisterForm)}>
        Register
      </Button>
      {showRegisterForm && (
        <Form onSubmit={handleSubmit}>
          <Input
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleInputChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
          <Input
            name="first_name"
            placeholder="First Name"
            onChange={handleInputChange}
            required
          />
          <Input
            name="last_name"
            placeholder="Last Name"
            onChange={handleInputChange}
            required
          />
          <Input
            name="company_name"
            placeholder="Company Name"
            onChange={handleInputChange}
            required
          />
          <Input
            name="position"
            placeholder="Position in Company"
            onChange={handleInputChange}
            required
          />
          <Input
            name="company_location"
            placeholder="Company Location (Optional)"
            onChange={handleInputChange}
          />
          <TextArea
            name="needs_problems"
            placeholder="Needs/Problems"
            onChange={handleInputChange}
            required
          />
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </LandingPageContainer>
  );
};

export default LandingPage;