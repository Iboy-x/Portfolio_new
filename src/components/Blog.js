import React, { useEffect, useRef } from 'react';
import './Blog.css';

const posts = [
  { title: '🚀 Flying Lessons from Code', snippet: 'What coding and aviation have in common...', date: '2025-06-27', featured: true },
  { title: '💡 Startup Ideas at 2AM', snippet: 'Why Gen Z founders are different...', date: '2025-06-20' },
  { title: '🏆 Olympiad Mindset', snippet: 'How competitions shaped my thinking.', date: '2025-06-10' },
  { title: '📰 Hack Club in the News', snippet: 'Featured in local press for STEM outreach.', date: '2025-05-30' },
  { title: '🌐 New Project Launch', snippet: 'Announcing Memory Craft v2.0!', date: '2025-05-15' }
];

// Starry background component
const StarryBackground = () => {
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.querySelector('.starry-bg-blog');
      if (!starsContainer) return;
      
      // Clear existing stars
      starsContainer.innerHTML = '';
      
      // Create stars
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        starsContainer.appendChild(star);
      }
    };

    createStars();
    window.addEventListener('resize', createStars);
    return () => window.removeEventListener('resize', createStars);
  }, []);

  return <div className="starry-bg-blog" />;
};

function Blog() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = `slideInUp 0.8s ease-out ${index * 0.1}s both`;
        }
      });
    }, observerOptions);

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Magnetic effect for blog cards
    const cards = cardsRef.current;
    
    const handleMouseMove = (e) => {
      cards.forEach((card) => {
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          const moveX = deltaX * force * 0.08;
          const moveY = deltaY * force * 0.08;
          
          card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        } else {
          card.style.transform = 'translate(0, 0) scale(1)';
        }
      });
    };

    const handleMouseLeave = () => {
      cards.forEach((card) => {
        if (card) {
          card.style.transform = 'translate(0, 0) scale(1)';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="blog-section" id="blog">
      <StarryBackground />
      <h2 className="section-title">News & Info</h2>
      <p className="blog-intro">Updates, thoughts, and features from my journey in code, STEM, and beyond.</p>
      <div className="blog-grid">
        {posts.map((post, i) => (
          <div 
            className={`blog-card${post.featured ? ' featured' : ''}`} 
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            style={{ '--delay': i * 0.1 }}
          >
            <div className="blog-icon">{post.title.slice(0,2)}</div>
            <div className="blog-content">
              <h3>{post.title.replace(/^[^\w]+/,'')}</h3>
              <p>{post.snippet}</p>
              <span className="blog-date">{post.date}</span>
            </div>
            <div className="blog-hover-overlay">
              <span>Read More →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Blog; 