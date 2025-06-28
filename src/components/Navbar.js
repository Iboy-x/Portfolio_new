import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to scroll to section, navigating home if needed
  const handleSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar glass-nav">
      <div className="logo">Abdul Moiz</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/news">News</Link>
        <button className="nav-btn" onClick={() => handleSection('about')}>About</button>
        <button className="nav-btn" onClick={() => handleSection('experience')}>Experience</button>
        <button className="nav-btn" onClick={() => handleSection('contact')}>Contact</button>
      </div>
    </nav>
  );
}

export default Navbar; 