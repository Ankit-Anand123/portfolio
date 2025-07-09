import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Camera, FileText, Mail, Zap, Star, Clock } from 'lucide-react';

export const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen">

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <FileText className="w-24 h-24 text-indigo-600 dark:text-indigo-400 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Technical articles, tutorials, and insights on data science, machine learning,
            and the latest technology trends.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <Clock className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Blog Features</h3>
            <ul className="text-left text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Technical tutorials and how-to guides</li>
              <li>• Data science case studies and insights</li>
              <li>• Machine learning project breakdowns</li>
              <li>• Industry trends and analysis</li>
              <li>• Personal learning journey and tips</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
