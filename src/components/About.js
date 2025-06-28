import React, { useEffect } from 'react';
import './About.css';

function About() {
  useEffect(() => {
    const el = document.querySelector('.about-section');
    const reveal = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('reveal');
      }
    };
    window.addEventListener('scroll', reveal);
    reveal();
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <div className="about-photo">
          {/* Replace with real photo later */}
          <svg width="110" height="110" viewBox="0 0 110 110">
            <circle cx="55" cy="55" r="52" fill="#232946" stroke="#6c63ff" strokeWidth="4" />
            <ellipse cx="55" cy="60" rx="28" ry="36" fill="#fff" opacity="0.13" />
            <ellipse cx="55" cy="50" rx="18" ry="22" fill="#fff" opacity="0.18" />
          </svg>
        </div>
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            Hey! I'm Abdul Moiz, a multi-talented teen from Pakistan. I'm obsessed with building things — from code to circuits to communities. I'm an A-Level student (Physics, Math, CS, FM), a hackathon lover, and a future pilot & tech founder. I code in Python, JS, C++, and love mixing hardware with software. My dream? To fly high — literally and in tech!
          </p>
          <div className="about-tags">
            <span>Physics</span>
            <span>Math</span>
            <span>CS</span>
            <span>Further Math</span>
            <span>Python</span>
            <span>JavaScript</span>
            <span>C++</span>
            <span>Hardware</span>
            <span>Web Dev</span>
            <span>Pilot Dreams</span>
            <span>Startup Builder</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About; 