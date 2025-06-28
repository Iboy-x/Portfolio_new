import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const taglines = [
  'Wheels up, dreams up.',
  'Future Pilot & Tech Founder',
  'Building from Pakistan to the World.'
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const canvasRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    let timeout;
    if (typing && displayed.length < taglines[current].length) {
      timeout = setTimeout(() => {
        setDisplayed(taglines[current].slice(0, displayed.length + 1));
      }, 60);
    } else if (typing && displayed.length === taglines[current].length) {
      timeout = setTimeout(() => setTyping(false), 1200);
    } else if (!typing) {
      timeout = setTimeout(() => {
        setTyping(true);
        setDisplayed('');
        setCurrent((current + 1) % taglines.length);
      }, 800);
    }
    return () => clearTimeout(timeout);
  }, [typing, displayed, current]);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const w = window.innerWidth;
    const h = 420;
    canvas.width = w;
    canvas.height = h;
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3
      });
    }
    let mouse = { x: w / 2, y: h / 2 };
    const onMouseMove = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY - 80;
    };
    window.addEventListener('mousemove', onMouseMove);
    let running = true;
    function animate() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        // Mouse repulsion
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          p.x += dx / dist * 0.7;
          p.y += dy / dist * 0.7;
        }
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // 3D code snippet SVG trail
  const CodeTrailSVG = () => (
    <svg width="400" height="80" viewBox="0 0 400 80" className="code-trail-svg">
      <g>
        <rect x="10" y="25" rx="6" ry="6" width="70" height="30" fill="#232946" stroke="#6c63ff" strokeWidth="2" />
        <text x="20" y="45" fill="#fff" fontFamily="'Space Grotesk', monospace" fontSize="14">console.log('Hi!')</text>
        <rect x="100" y="15" rx="6" ry="6" width="85" height="30" fill="#232946" stroke="#ff6ec4" strokeWidth="2" />
        <text x="110" y="35" fill="#fff" fontFamily="'Space Grotesk', monospace" fontSize="14">def fly():</text>
        <rect x="200" y="35" rx="6" ry="6" width="105" height="30" fill="#232946" stroke="#00e6fe" strokeWidth="2" />
        <text x="210" y="55" fill="#fff" fontFamily="'Space Grotesk', monospace" fontSize="14">print('Dream!')</text>
        <rect x="320" y="20" rx="6" ry="6" width="70" height="30" fill="#232946" stroke="#6c63ff" strokeWidth="2" />
        <text x="330" y="40" fill="#fff" fontFamily="'Space Grotesk', monospace" fontSize="14">return true</text>
      </g>
    </svg>
  );

  return (
    <section className="hero-section" id="home">
      <canvas ref={canvasRef} className="particle-bg" />
      <div className="hero-content">
        <h1 className="hero-title">Abdul Moiz</h1>
        <div className="typewriter">
          <span>{displayed}</span>
          <span className="type-cursor">|</span>
        </div>
        <div className="hero-buttons">
          <a href="#projects" className="cta-button primary">Projects</a>
          <a href="#resume" className="cta-button secondary">Resume</a>
          <a href="#contact" className="cta-button secondary">Let's Connect</a>
        </div>
        <div className="coder-trail">
          <CodeTrailSVG />
        </div>
      </div>
    </section>
  );
}

export default Hero;