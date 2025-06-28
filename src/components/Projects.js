import React, { useEffect, useRef } from 'react';
import './Projects.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'codeIt',
    desc: 'A collaborative coding platform for students.',
    stack: ['React', 'Node.js', 'Socket.io'],
    link: '#',
    year: '2024'
  },
  {
    title: 'Boycott Buddy',
    desc: 'A Chrome extension for ethical shopping.',
    stack: ['JS', 'Chrome API'],
    link: '#',
    year: '2024'
  },
  {
    title: 'College Application Roastbot',
    desc: 'AI bot to review and roast college essays.',
    stack: ['Python', 'OpenAI', 'React'],
    link: '#',
    year: '2024'
  },
  {
    title: 'Land Rover 4x4 Controller',
    desc: 'Custom hardware controller for robotics challenge.',
    stack: ['Arduino', 'C++', '3D Print'],
    link: '#',
    year: '2023'
  },
  {
    title: 'Memory Craft',
    desc: 'A memory game for brain training.',
    stack: ['React', 'CSS'],
    link: '#',
    year: '2023'
  }
];

// Starry background component
const StarryBackground = () => {
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.querySelector('.starry-bg');
      if (!starsContainer) return;
      starsContainer.innerHTML = '';
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
  return <div className="starry-bg" />;
};

function Projects() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const timeline = timelineRef.current;
      const container = containerRef.current;
      if (!timeline || !container) return;

      const cardWidth = cardRefs.current[0]?.offsetWidth || 300;
      const centerOffset = (window.innerWidth / 2) - (cardWidth / 2);
      const totalScroll = timeline.scrollWidth - window.innerWidth + centerOffset * 2;

      gsap.to(timeline, {
        x: () => `-${timeline.scrollWidth - window.innerWidth + centerOffset * 2}px`,
        ease: 'none',
        scrollTrigger: {
          id: 'projects-timeline',
          trigger: container,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const progress = self.progress;
            const idx = Math.round(progress * (cardRefs.current.length - 1));
            cardRefs.current.forEach((card, i) => {
              if (!card) return;
              if (i === idx) {
                card.classList.add('active');
                card.classList.remove('prev', 'next');
              } else if (i < idx) {
                card.classList.remove('active', 'next');
                card.classList.add('prev');
              } else {
                card.classList.remove('active', 'prev');
                card.classList.add('next');
              }
            });
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section" id="projects" ref={containerRef}>
      <StarryBackground />
      <h2 className="section-title">Projects</h2>
      <p className="projects-intro">A selection of my favorite builds, from code to hardware. Scroll to explore.</p>
      <div className="horiz-scroll-timeline" ref={timelineRef}>
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`horiz-card${idx === 0 ? ' active' : ''}`}
            ref={el => (cardRefs.current[idx] = el)}
            style={{ zIndex: 2 - Math.abs(idx) }}
          >
            <div className="circle-content">
              <div className="project-year">{project.year}</div>
              <div className="circle-title">{project.title}</div>
              <div className="circle-desc">{project.desc}</div>
              <div className="circle-stack">
                {project.stack.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              <a href={project.link} className="view-project" target="_blank" rel="noopener noreferrer">
                View Project →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects; 