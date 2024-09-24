import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <header>
        <img src="/finbridge-logo-bw.png" alt="FinBridge Logo" className="logo" />
      </header>
      <main>
        <p>A financial inclusion bridge that leads to growth. Register/Sign In below to get started.</p>
        <Link to="/login" className="btn">Sign In</Link>
        <Link to="/register" className="btn">Register</Link>
      </main>
    </div>
  );
}

export default LandingPage;
