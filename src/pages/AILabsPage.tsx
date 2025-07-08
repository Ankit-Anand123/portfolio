import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Camera, FileText, Mail, Zap, Star, Clock } from 'lucide-react';

export const AILabsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                AI Playground
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Interactive AI features and experimental tools
              </p>
            </div>
            
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Brain className="w-24 h-24 text-orange-600 dark:text-orange-400 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Coming in Week 3
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Interactive AI features including resume analyzer, data story generator, 
            and more experimental tools powered by machine learning.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <Zap className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Resume Analyzer</h3>
              <p className="text-gray-600 dark:text-gray-300">AI-powered resume analysis and feedback</p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <Star className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Data Story Generator</h3>
              <p className="text-gray-600 dark:text-gray-300">Transform data into compelling narratives</p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <Brain className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">ML Playground</h3>
              <p className="text-gray-600 dark:text-gray-300">Interactive machine learning experiments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
