import React, { useEffect, useRef } from 'react';
import './Projects.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Roast My Essay',
    desc: 'AI bot to review and roast college essays.',
    stack: ['next Js', 'OpenAI', 'Firebase'],
    link: 'https://roastmyessay.games',
    year: '2025'
  },
  {
    title: 'Fly It Rig V1',
    desc: 'A custom Flight cockpit ',
    stack: ['CAD (fusion) ', 'C++', 'Arduino'],
    link: 'https://github.com/Iboy-x/FlyIt-rig-V1',
    year: '2025'
  },
  {
    title: 'Memory Craft',
    desc: 'A memory game for brain training.',
    stack: ['React', 'CSS'],
    link: 'https://iboy-x.github.io/MemoCraft/',
    year: '2024'
  },
  {
    title: 'Land Rover 4x4 Controller',
    desc: 'Custom hardware controller for robotics challenge.',
    stack: ['Arduino', 'C++', '3D Print'],
    link: 'https://f1-in-schools-torque.invisionzone.com/4x4/4x4-getting-started/',
    year: '2025'
  },
  {
    title: 'Project gallery',
    desc: 'You can view few other of my projects here.',
    stack: ['CSS', 'Html'],
    link: 'https://iboy-x.github.io/Projects-Boba/',
    year: '2024'
  },
  {
    title: 'Portfolio',
    desc: 'This is my first portfolio website.',
    stack: ['HTML', 'CSS', 'JS'],
    link: 'https://iboy-x.github.io/Portfolio/',
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
  const [visibleIdx, setVisibleIdx] = React.useState(-1);

  // Reverse the projects array for right-to-left scroll
  const reversedProjects = [...projects].reverse();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const timeline = timelineRef.current;
      const container = containerRef.current;
      if (!timeline || !container) return;

      const cardWidth = cardRefs.current[0]?.offsetWidth || 300;
      const centerOffset = (window.innerWidth / 2) - (cardWidth / 2);
      const totalScroll = timeline.scrollWidth - window.innerWidth + centerOffset * 2;

      gsap.set(timeline, { x: window.innerWidth });

      gsap.to(timeline, {
        x: () => `-${timeline.scrollWidth - window.innerWidth + centerOffset * 2}px`,
        ease: 'power1.inOut',
        scrollTrigger: {
          id: 'projects-timeline',
          trigger: container,
          start: 'top top',
          end: () => `+=${(totalScroll + window.innerWidth) * 1.25}`,
          scrub: 2.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const progress = self.progress;
            const idx = Math.round(progress * (cardRefs.current.length - 1));
            setVisibleIdx(idx);
            cardRefs.current.forEach((card, i) => {
              if (!card) return;
              const cardRect = card.getBoundingClientRect();
              const cardCenter = cardRect.left + cardRect.width / 2;
              const screenCenter = window.innerWidth / 2;
              const dist = Math.abs(cardCenter - screenCenter);
              if (cardCenter > window.innerWidth) {
                gsap.to(card, { opacity: 0, scale: 0.7, filter: 'blur(8px) grayscale(1)', duration: 0.09, pointerEvents: 'none' });
              } else if (dist < cardRect.width * 0.6) {
                gsap.to(card, { opacity: 1, scale: 1.08, filter: 'none', duration: 0.09, pointerEvents: 'auto' });
              } else {
                gsap.to(card, { opacity: 0.3, scale: 0.7, filter: 'blur(3px) grayscale(0.8)', duration: 0.09, pointerEvents: 'none' });
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
        <div className="projects-timeline-line" />
        {reversedProjects.map((project, idx) => (
          <React.Fragment key={idx}>
            {visibleIdx === idx && cardRefs.current[idx] && (
              <div
                className="projects-timeline-dotmask"
                style={{
                  left: cardRefs.current[idx].offsetLeft + 'px',
                  width: cardRefs.current[idx].offsetWidth + 'px'
                }}
              />
            )}
            <div
              className={`horiz-card`}
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
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default Projects; 
