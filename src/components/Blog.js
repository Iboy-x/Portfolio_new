import React from 'react';
import './Blog.css';

const posts = [
  { title: '🚀 Flying Lessons from Code', snippet: 'What coding and aviation have in common...', date: '2025-06-27', featured: true },
  { title: '💡 Startup Ideas at 2AM', snippet: 'Why Gen Z founders are different...', date: '2025-06-20' },
  { title: '🏆 Olympiad Mindset', snippet: 'How competitions shaped my thinking.', date: '2025-06-10' },
  { title: '📰 Hack Club in the News', snippet: 'Featured in local press for STEM outreach.', date: '2025-05-30' },
  { title: '🌐 New Project Launch', snippet: 'Announcing Memory Craft v2.0!', date: '2025-05-15' }
];

function Blog() {
  return (
    <section className="blog-section" id="blog">
      <h2 className="section-title">News & Info</h2>
      <p className="blog-intro">Updates, thoughts, and features from my journey in code, STEM, and beyond.</p>
      <div className="blog-grid">
        {posts.map((post, i) => (
          <div className={`blog-card${post.featured ? ' featured' : ''}`} key={i}>
            <div className="blog-icon">{post.title.slice(0,2)}</div>
            <div>
              <h3>{post.title.replace(/^[^\w]+/,'')}</h3>
              <p>{post.snippet}</p>
              <span className="blog-date">{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Blog; 