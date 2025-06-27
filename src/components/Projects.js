import React from 'react';
import './Projects.css';

const projects = [
  {
    title: 'codeIt',
    desc: 'A collaborative coding platform for students.',
    stack: ['React', 'Node.js', 'Socket.io'],
    link: '#'
  },
  {
    title: 'Boycott Buddy',
    desc: 'A Chrome extension for ethical shopping.',
    stack: ['JS', 'Chrome API'],
    link: '#'
  },
  {
    title: 'College Application Roastbot',
    desc: 'AI bot to review and roast college essays.',
    stack: ['Python', 'OpenAI', 'React'],
    link: '#'
  },
  {
    title: 'Land Rover 4x4 Controller',
    desc: 'Custom hardware controller for robotics challenge.',
    stack: ['Arduino', 'C++', '3D Print'],
    link: '#'
  },
  {
    title: 'Memory Craft',
    desc: 'A memory game for brain training.',
    stack: ['React', 'CSS'],
    link: '#'
  }
];

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <h2 className="section-title">Projects</h2>
      <p className="projects-intro">A selection of my favorite builds, from code to hardware. Click any card to learn more.</p>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div className="project-card" key={i} style={{ '--i': i }}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="stack-list">
              {p.stack.map((s, j) => <span key={j}>{s}</span>)}
            </div>
            <a href={p.link} className="see-more" target="_blank" rel="noopener noreferrer">See more →</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects; 