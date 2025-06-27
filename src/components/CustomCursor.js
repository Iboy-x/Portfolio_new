import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

function CustomCursor() {
  const cursorRef = useRef();
  const trailRef = useRef();

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let trailX = lastX, trailY = lastY;
    const move = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      cursor.style.transform = `translate(${lastX - 16}px, ${lastY - 16}px)`;
    };
    const animateTrail = () => {
      trailX += (lastX - trailX) * 0.18;
      trailY += (lastY - trailY) * 0.18;
      trail.style.transform = `translate(${trailX - 12}px, ${trailY - 12}px)`;
      requestAnimationFrame(animateTrail);
    };
    window.addEventListener('mousemove', move);
    animateTrail();
    // Magnetic effect
    const magnetize = (e) => {
      document.querySelectorAll('a,button,.neon-btn').forEach(el => {
        const rect = el.getBoundingClientRect();
        const mx = e.clientX, my = e.clientY;
        const cx = rect.left + rect.width/2, cy = rect.top + rect.height/2;
        const dist = Math.hypot(mx-cx, my-cy);
        if (dist < 80) {
          el.style.transform = `translate(${(mx-cx)*0.12}px, ${(my-cy)*0.12}px)`;
        } else {
          el.style.transform = '';
        }
      });
    };
    window.addEventListener('mousemove', magnetize);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', magnetize);
    };
  }, []);

  return (
    <>
      <svg ref={cursorRef} className="cursor" width="32" height="32" viewBox="0 0 32 32">
        <polygon points="2,16 30,6 18,18 26,18 18,26 18,18 2,16" fill="#fff" stroke="#6c63ff" strokeWidth="1.5" />
      </svg>
      <svg ref={trailRef} className="cursor-trail" width="24" height="24" viewBox="0 0 24 24">
        <ellipse cx="12" cy="20" rx="8" ry="4" fill="#fff" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0;0.3" dur="1.2s" repeatCount="indefinite" />
        </ellipse>
      </svg>
    </>
  );
}

export default CustomCursor; 