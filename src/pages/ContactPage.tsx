import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Camera, FileText, Mail, Zap, Star, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/20 dark:to-blue-900/20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Let's Connect
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Get in touch for collaborations, opportunities, or just to chat
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
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <Mail className="w-24 h-24 text-blue-600 dark:text-blue-400 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Coming in Week 3
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Smart contact form with AI categorization and instant response capabilities.
            </p>
          </div>

          {/* Current Contact Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Contact Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <Mail className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email</h4>
                <a 
                  href="mailto:ankitanand.2910@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ankitanand.2910@gmail.com
                </a>
              </div>
              
              <div className="text-center">
                <svg className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">LinkedIn</h4>
                <a 
                  href="https://linkedin.com/in/ankitanand29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ankitanand29
                </a>
              </div>
            </div>
            
            <div className="text-center mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                Currently located in <strong>Coimbatore, Tamil Nadu, India</strong>
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Open to remote work and collaboration opportunities worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};