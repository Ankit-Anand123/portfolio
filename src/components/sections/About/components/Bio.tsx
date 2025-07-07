import React from 'react';
import { MapPin, Mail, Phone, Linkedin, GraduationCap, Award } from 'lucide-react';

export const Bio: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-white">AA</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ankit Anand
          </h3>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
            Senior Data Scientist & Blogger
          </p>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Professional Summary
        </h4>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Dedicated and result-oriented Data Scientist and Blogger with a strong mathematical 
          background and 6+ years of experience in building data-intensive applications. 
          Proficient in descriptive analytics, predictive modeling, and data processing, 
          helping businesses solve complex problems. Prepared to lead and train teams in 
          machine learning and gathering insights to boost business efficiency and achieve 
          strategic goals.
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            Coimbatore, Tamil Nadu, India
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <a 
            href="mailto:ankitanand.2910@gmail.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ankitanand.2910@gmail.com
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            +91 8249089552
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Linkedin className="w-5 h-5 text-gray-400" />
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

      {/* Education Highlights */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2" />
          Education
        </h4>
        
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="font-semibold text-gray-900 dark:text-white">
              Master of Science: ML & AI
            </div>
            <div className="text-blue-600 dark:text-blue-400">
              Woolf University Canterbury, England
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              March 2022 - June 2024
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="font-semibold text-gray-900 dark:text-white">
              B.Tech: Computer Science & Technology
            </div>
            <div className="text-green-600 dark:text-green-400">
              Indira Gandhi Institute of Technology, Sarang
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 flex justify-between">
              <span>July 2014 - June 2018</span>
              <span className="font-medium">CGPA: 8.23</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mt-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Certifications
        </h4>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">
              Python for Data Science, AI & Development - Coursera
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-300">
              Machine Learning Specialization - Coursera
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};