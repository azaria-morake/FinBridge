import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container">
      <header>
        <img src="/finbridge-logo-bw.png" alt="FinBridge Logo" className="logo" />
      </header>
      <main>
        <p>Your SMME's bridge to financial inclusion, a chance for growth.</p>
        <Link to="/login" className="btn">Sign In</Link>
        <Link to="/register" className="btn">Register</Link>
      </main>
    </div>
  );
}

export default LandingPage;
