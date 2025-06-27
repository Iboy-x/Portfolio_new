import React, { useEffect } from 'react';
import './Contact.css';

function Contact() {
  useEffect(() => {
    const el = document.querySelector('.contact-section');
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
    <section className="contact-section" id="contact">
      <h2 className="section-title">Let's Talk</h2>
      <div className="contact-content">
        <div className="contact-info">
          <p>Email: <a href="mailto:abdulmoiz@email.com">abdulmoiz@email.com</a></p>
          <div className="social-links">
            <a href="https://github.com/abdulmoizdev" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/abdulmoizdev" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com/abdulmoizdev" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <form className="contact-form" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required />
          <button type="submit" className="neon-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
}

export default Contact; 