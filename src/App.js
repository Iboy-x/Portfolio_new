import React from 'react';
import './index.css';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Blog from './components/Blog';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Experience />
            <Contact />
          </>
        } />
        <Route path="/projects" element={<Projects />} />
        <Route path="/news" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
