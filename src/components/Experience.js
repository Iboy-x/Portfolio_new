import React, { useEffect } from 'react';
import './Experience.css';

const experiences = [
  { icon: '🚀', title: 'Hack Club', desc: 'Lead, builder, and hackathon organizer.' },
  { icon: '💻', title: 'Cedar Codes', desc: 'Founder & President, coding community.' },
  { icon: '🛩️', title: 'CREW Society', desc: 'Aviation & STEM outreach.' },
  { icon: '🏅', title: 'Olympiads', desc: 'Math, CS, and Physics competitions.' },
  { icon: '👑', title: 'Leadership', desc: 'Team lead, mentor, and event host.' },
  { icon: '🌟', title: 'STEM Outreach', desc: 'Workshops, talks, and community impact.' }
];

function Experience() {
  useEffect(() => {
    const el = document.querySelector('.experience-section');
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
    <section className="experience-section" id="experience">
      <h2 className="section-title">Experience & Achievements</h2>
      <div className="exp-grid">
        {experiences.map((exp, i) => (
          <div className="exp-card" key={i}>
            <span className="exp-icon">{exp.icon}</span>
            <div>
              <h3>{exp.title}</h3>
              <p>{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience; 