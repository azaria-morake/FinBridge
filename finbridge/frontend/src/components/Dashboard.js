// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #FFF5E6;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #FF8C00;
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background-color: white;
  color: #FF8C00;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: auto;
  transition: background-color 0.3s;

  &:hover {
    background-color: #E6E6E6;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
`;

const Alert = styled.div`
  background-color: #FFE4B5;
  color: #8B4513;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
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
  width: 80%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/', {
        withCredentials: true
      });
      setUser(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('http://localhost:8000/api/user/', formData, {
        withCredentials: true
      });
      setShowModal(false);
      fetchUserData();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout/', {}, {
        withCredentials: true
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContainer>
      <Sidebar>
        <ProfilePicture src={user.profile_picture || '/default-profile.png'} alt="Profile" />
        <UserInfo>
          <h2>{user.first_name} {user.last_name}</h2>
          <p>{user.company_name}</p>
          <p>{user.position}</p>
        </UserInfo>
        <Button onClick={() => setShowModal(true)}>Settings</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </Sidebar>
      <MainContent>
        <Alert>🚧 Dashboard under construction 🚧</Alert>
      </MainContent>
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>Edit Profile</h2>
            <Form onSubmit={handleSubmit}>
              <Input
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
              <Input
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
              <Input
                name="company_name"
                placeholder="Company Name"
                value={formData.company_name}
                onChange={handleInputChange}
              />
              <Input
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleInputChange}
              />
              <Input
                name="company_location"
                placeholder="Company Location"
                value={formData.company_location}
                onChange={handleInputChange}
              />
              <TextArea
                name="needs_problems"
                placeholder="Needs/Problems"
                value={formData.needs_problems}
                onChange={handleInputChange}
              />
              <Input
                type="file"
                name="profile_picture"
                onChange={(e) => setFormData({ ...formData, profile_picture: e.target.files[0] })}
              />
              <Button type="submit">Save</Button>
              <Button type="button" onClick={() => setShowModal(false)}>Cancel</Button>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;