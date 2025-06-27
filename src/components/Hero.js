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
    function animate() {
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
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Starry night SVG for dark mode
  const StarrySVG = () => (
    <svg className="star-bg" width="100%" height="420" style={{position:'absolute',top:0,left:0,zIndex:0}}>
      {[...Array(60)].map((_,i) => (
        <circle key={i} cx={Math.random()*window.innerWidth} cy={Math.random()*420} r={Math.random()*1.5+0.5} fill="#fff" opacity={Math.random()*0.7+0.3} />
      ))}
    </svg>
  );
  // Sun rays SVG for light mode
  const SunRaysSVG = () => (
    <svg className="sun-bg" width="100%" height="420" style={{position:'absolute',top:0,left:0,zIndex:0}}>
      <radialGradient id="sun" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fffbe6" stopOpacity="1" />
        <stop offset="100%" stopColor="#ffe5ec" stopOpacity="0.2" />
      </radialGradient>
      <circle cx={window.innerWidth/2} cy="210" r="120" fill="url(#sun)" />
      {[...Array(18)].map((_,i) => (
        <rect key={i} x={window.innerWidth/2-2} y={90} width="4" height="60" fill="#ffe5ec" opacity="0.18" transform={`rotate(${i*20} ${window.innerWidth/2} 210)`} />
      ))}
    </svg>
  );
  // 3D code snippet SVG trail
  const CodeTrailSVG = () => (
    <svg width="320" height="60" viewBox="0 0 320 60" className="code-trail-svg">
      <g>
        <rect x="10" y="20" rx="8" ry="8" width="60" height="28" fill="#232946" stroke="#6c63ff" strokeWidth="2" filter="url(#blur)" />
        <text x="20" y="40" fill="#fff" fontFamily="'Space Grotesk', monospace" fontSize="16">console.log('Hi!')</text>
        <rect x="90" y="10" rx="8" ry="8" width="80" height="28" fill="#232946" stroke="#ff6ec4" strokeWidth="2" />
        <text x="100" y="30" fill="#fff" fontFamily="'Space Grotesk', monospace" fontSize="16">def fly():</text>
        <rect x="200" y="30" rx="8" ry="8" width="100" height="28" fill="#232946" stroke="#00e6fe" strokeWidth="2" />
        <text x="210" y="50" fill="#fff" fontFamily="'Space Grotesk', monospace" fontSize="16">print('Dream!')</text>
      </g>
      <defs>
        <filter id="blur"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>
    </svg>
  );

  return (
    <section className="hero-section">
      <canvas ref={canvasRef} className="particle-bg" />
      <div className="hero-content">
        <h1 className="hero-title">Abdul Moiz</h1>
        <div className="typewriter">
          <span>{displayed}</span>
          <span className="type-cursor">|</span>
        </div>
        <div className="hero-buttons">
          <a href="#projects" className="neon-btn">Projects</a>
          <a href="#resume" className="neon-btn">Resume</a>
          <a href="#contact" className="neon-btn">Let's Connect</a>
        </div>
        <div className="coder-trail">
          <CodeTrailSVG />
        </div>
      </div>
    </section>
  );
}

export default Hero; 