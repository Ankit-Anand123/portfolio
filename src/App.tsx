import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AILabsPage } from './pages/AILabsPage';
import { CreativePage } from './pages/CreativePage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { ScrollProgressIndicator } from './components/animations';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Scroll Progress Indicator */}
        <ScrollProgressIndicator 
          color="gradient"
          height="h-1"
          showPercentage={false}
        />
        
        <Header />
        
        <main className="pt-16"> {/* Add padding to account for fixed header */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            {/* <Route path="/ai-labs" element={<AILabsPage />} />
            <Route path="/creative" element={<CreativePage />} />
            <Route path="/blog" element={<BlogPage />} /> */}
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;