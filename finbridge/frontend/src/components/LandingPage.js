// src/components/LandingPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #FFF5E6;
  color: #4A4A4A;
  font-family: 'Arial', sans-serif;
`;

const Logo = styled.img`
  width: 200px;
  margin-top: 2rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  text-align: center;
  margin: 2rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const SignInButton = styled(Button)`
  background-color: #FF9800;
  color: white;
`;

const RegisterButton = styled(Button)`
  background-color: #4CAF50;
  color: white;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  resize: vertical;
`;

const LandingPage = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/users/register/', formData);
      alert('Registration successful! Please sign in.');
      setShowRegisterModal(false);
      setShowLoginModal(true);
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/users/login/', formData);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <LandingPageWrapper>
      <Logo src="/logo.png" alt="FinBridge Logo" />
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Description>
      <ButtonContainer>
        <SignInButton onClick={() => setShowLoginModal(true)}>Sign In</SignInButton>
        <RegisterButton onClick={() => setShowRegisterModal(true)}>Register</RegisterButton>
      </ButtonContainer>

      {showRegisterModal && (
        <Modal>
          <ModalContent>
            <h2>Register</h2>
            <Form onSubmit={handleRegister}>
              <Input name="name" placeholder="Name" onChange={handleInputChange} required />
              <Input name="surname" placeholder="Surname" onChange={handleInputChange} required />
              <Input name="email" type="email" placeholder="Email" onChange={handleInputChange} required />
              <Input name="password" type="password" placeholder="Password" onChange={handleInputChange} required />
              <Input name="company_name" placeholder="Company Name" onChange={handleInputChange} required />
              <Input name="position" placeholder="Position in Company" onChange={handleInputChange} required />
              <Input name="company_location" placeholder="Company Location (Optional)" onChange={handleInputChange} />
              <TextArea name="needs_problems" placeholder="Needs/Problems" onChange={handleInputChange} required />
              <Button type="submit">Submit</Button>
            </Form>
          </ModalContent>
        </Modal>
      )}

      {showLoginModal && (
        <Modal>
          <ModalContent>
            <h2>Sign In</h2>
            <Form onSubmit={handleLogin}>
              <Input name="email" type="email" placeholder="Email" onChange={handleInputChange} required />
              <Input name="password" type="password" placeholder="Password" onChange={handleInputChange} required />
              <Button type="submit">Sign In</Button>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </LandingPageWrapper>
  );
};

export default LandingPage;