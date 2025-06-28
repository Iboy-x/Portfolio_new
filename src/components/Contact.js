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
          <p>Email: <a href="mailto:abdulmoiz.adeel29@gmail.com">abdulmoiz.adeel29@gmail.com</a></p>
          <div className="social-links">
            <a href="https://github.com/Iboy-x" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="social-icon"><path fill="#fff" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>
              GitHub
            </a>
            <a href="https://www.instagram.com/abdul_m_0iz/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="social-icon"><rect width="20" height="20" x="2" y="2" rx="6" fill="#fff"/><rect width="16" height="16" x="4" y="4" rx="4" fill="#232946"/><circle cx="12" cy="12" r="4" fill="#fff"/><circle cx="17" cy="7" r="1.2" fill="#fff"/></svg>
              Instagram
            </a>
            <a href="mailto:abdulmoiz.adeel29@gmail.com" aria-label="Gmail">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="social-icon"><rect width="20" height="16" x="2" y="4" rx="3" fill="#fff"/><path d="M4 6l8 7 8-7" stroke="#232946" strokeWidth="2"/></svg>
              Gmail
            </a>
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