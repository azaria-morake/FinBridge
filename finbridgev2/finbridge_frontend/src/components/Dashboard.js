import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <img src="/placeholder-profile.png" alt="Profile" className="profile-pic" />
          <h3>John Doe</h3>
          <p>Company XYZ</p>
          <p>CEO</p>
        </div>
        <button className="settings-btn">Settings</button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </aside>
      <main className="content">
        <p>Under construction...</p>
      </main>
    </div>
  );
}

export default Dashboard;
