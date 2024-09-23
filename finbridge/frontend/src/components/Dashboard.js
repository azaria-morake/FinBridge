// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashboardWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #FFF5E6;
  color: #4A4A4A;
  font-family: 'Arial', sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #FF9800;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  color: white;
  margin-bottom: 2rem;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #4CAF50;
  color: white;
  margin-top: auto;

  &:hover {
    opacity: 0.9;
  }
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

const Alert = styled.div`
  background-color: #f44336;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/profiles/me/');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8000/api/profiles/me/', formData);
      alert('Settings updated successfully!');
      setShowSettingsModal(false);
      fetchUserProfile();
    } catch (error) {
      alert('Failed to update settings. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/users/logout/');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <DashboardWrapper>
      <Sidebar>
        <ProfilePicture src={user?.profile_picture || '/default-profile.png'} alt="Profile" />
        <UserInfo>
          <h2>{`${user?.user.first_name} ${user?.user.last_name}`}</h2>
          <p>{user?.company_name}</p>
          <p>{user?.position}</p>
        </UserInfo>
        <Button onClick={() => setShowSettingsModal(true)}>Settings</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </Sidebar>
      <MainContent>
        <Alert>This dashboard is under construction.</Alert>
      </MainContent>

      {showSettingsModal && (
        <Modal>
          <ModalContent>
            <h2>Edit Settings</h2>
            <Form onSubmit={handleSettingsUpdate}>
              <Input name="company_name" placeholder="Company Name" defaultValue={user?.company_name} onChange={handleInputChange} />
              <Input name="position" placeholder="Position" defaultValue={user?.position} onChange={handleInputChange} />
              <Input name="company_location" placeholder="Company Location" defaultValue={user?.company_location} onChange={handleInputChange} />
              <TextArea name="needs_problems" placeholder="Needs/Problems" defaultValue={user?.needs_problems} onChange={handleInputChange} />
              <Input type="file" name="profile_picture" onChange={handleInputChange} />
              <Button type="submit">Save</Button>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </DashboardWrapper>
  );
};

export default Dashboard;