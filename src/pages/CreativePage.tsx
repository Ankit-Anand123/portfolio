import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Camera, FileText, Mail, Zap, Star, Clock } from 'lucide-react';

export const CreativePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Creative Corner
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Photography gallery and poetry with AI analysis
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
          <Camera className="w-24 h-24 text-pink-600 dark:text-pink-400 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Coming in Week 3
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            A showcase of creative work including photography galleries and poetry 
            with AI-powered sentiment analysis.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <Camera className="w-16 h-16 text-pink-600 dark:text-pink-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Photography Gallery</h3>
              <p className="text-gray-600 dark:text-gray-300">Interactive photo grid with lightbox and filtering capabilities</p>
            </div>
            
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <FileText className="w-16 h-16 text-pink-600 dark:text-pink-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Poetry Collection</h3>
              <p className="text-gray-600 dark:text-gray-300">Personal poems with AI sentiment analysis and emotional insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};