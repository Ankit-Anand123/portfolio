import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Hero } from './components/sections/Hero';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header />
        
        <main>
          {/* Hero Section */}
          <Hero />
          
          {/* Placeholder sections for Week 2 */}
          <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">About Me</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Coming in Week 2 - Skills radar chart, bio, and current focus areas
              </p>
            </div>
          </section>
          
          <section id="experience" className="py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">Professional Journey</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Coming in Week 2 - Interactive timeline with your career progression
              </p>
            </div>
          </section>
          
          <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">Project Portfolio</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Coming in Week 2 - Filterable project showcase with your work
              </p>
            </div>
          </section>
          
          <section id="ai-labs" className="py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">AI Playground</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Coming in Week 3 - Resume analyzer, data story generator, and more AI features
              </p>
            </div>
          </section>
          
          <section id="creative" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">Creative Corner</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Coming in Week 2 - Photography gallery and poetry with AI analysis
              </p>
            </div>
          </section>
          
          <section id="blog" className="py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">Blog</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Coming in Week 2 - Technical articles and insights
              </p>
            </div>
          </section>
          
          <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Coming in Week 3 - Smart contact form with AI categorization
              </p>
            </div>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;