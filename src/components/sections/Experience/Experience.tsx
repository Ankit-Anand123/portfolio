import React, { useState } from 'react';
import { Timeline } from './components/Timeline';
import { JobCard } from './components/JobCard';
import { SkillTags } from './components/SkillTags';
import styles from './Experience.module.css';
import { Briefcase, Calendar, MapPin, TrendingUp } from 'lucide-react';

export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: string;
  endDate: string;
  location: string;
  domain: string;
  description: string[];
  technologies: string[];
  achievements: string[];
  type: 'current' | 'past';
}

const experienceData: ExperienceData[] = [
  {
    id: 'bosch-2023',
    company: 'Bosch Global Software Technologies',
    position: 'Senior Data Scientist',
    duration: 'September 2023 - Present',
    startDate: '2023-09',
    endDate: 'Present',
    location: 'Coimbatore, India',
    domain: 'Sensor Technology',
    description: [
      'Performed in-depth analysis for parts affected by humidity in Inertial sensors using various higher dimension analysis tools like PCA and UMAP.',
      'Outlier detection was performed for the above-mentioned parts using Tree based classifiers for supervised approach and anomaly detection techniques for unsupervised approach like clustering, RANSAC, and Elliptical Envelope.',
      'Designed dashboards in Tableau for analyzing KPI performance for various products.'
    ],
    technologies: ['Python', 'PCA', 'UMAP', 'Tree Classifiers', 'RANSAC', 'Tableau', 'Clustering', 'Anomaly Detection'],
    achievements: [
      'Advanced sensor data analytics implementation',
      'Comprehensive outlier detection system',
      'Multi-product KPI dashboard suite'
    ],
    type: 'current'
  },
  {
    id: 'innova-senior-2023',
    company: 'Innova Solutions',
    position: 'Senior Data Scientist',
    duration: 'April 2023 - August 2023',
    startDate: '2023-04',
    endDate: '2023-08',
    location: 'Hyderabad, India',
    domain: 'Supply Chain, Procurement (Gerdau)',
    description: [
      'Price data for direct materials used in steel manufacturing was researched and acquired from multiple APIs and kept in the application database.',
      'Useful insights on trends, seasonality, and auto-correlation were gained by utilizing data analysis and visualization approaches using Matplotlib, Seaborn, and Statsmodels.',
      'Discovered anomalies in relation to 3 historical events by identifying change points in the historical data.',
      'Developed a model to forecast 90% confidence interval of the alloy prices and achieved a MAPE of 23%.',
      'Streamlit was used to develop a user interface for displaying the analysis and forecasted results.'
    ],
    technologies: ['Python', 'APIs', 'Matplotlib', 'Seaborn', 'Statsmodels', 'Time Series', 'Streamlit', 'SQL'],
    achievements: [
      'MAPE of 23% in price forecasting',
      '90% confidence interval modeling',
      'Historical anomaly detection system'
    ],
    type: 'past'
  },
  {
    id: 'innova-ds-2020',
    company: 'Innova Solutions',
    position: 'Data Scientist',
    duration: 'October 2020 - March 2023',
    startDate: '2020-10',
    endDate: '2023-03',
    location: 'Hyderabad, India',
    domain: 'Supply Chain, Logistics & Healthcare',
    description: [
      'Used libraries like numpy, pandas, seaborn, and plotly to perform EDA and visualizations on data to produce insights that aided business in making crucial decisions.',
      'Using Logistic Regression, developed a predictive model to predict the likelihood of a shipment being delayed with an accuracy of 93%.',
      'Helped the company in reducing losses by identifying anomalies in transportation where third-party vendors were used.',
      'Developed robust algorithms to predict the risk of hospitalization and recommend treatment plans for therapy patients using K-NN and custom scoring algorithms.',
      'Achieved remarkable accuracy of 82% in building a model that recommends a minimum of 7 treatments in a treatment plan.',
      'Implemented a facial recognition system using state-of-the-art algorithms for automated library check-in and check-out.'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Plotly', 'Logistic Regression', 'K-NN', 'Computer Vision', 'Flask', 'Pyzbar'],
    achievements: [
      '93% accuracy in shipment delay prediction',
      '82% accuracy in treatment recommendation',
      'Facial recognition automation system'
    ],
    type: 'past'
  },
  {
    id: 'innova-swe-2018',
    company: 'Innova Solutions',
    position: 'Software Engineer',
    duration: 'August 2018 - September 2020',
    startDate: '2018-08',
    endDate: '2020-09',
    location: 'Hyderabad, India',
    domain: 'Retail Shopping Cart & Sales Application',
    description: [
      'Developed web applications using Spring MVC, HTML, CSS, React, and Backbone JS.',
      'Developed Micro-services using Spring Boot.',
      'Efficacious at managing the source versions with the development team using Git.',
      'Integration of user-facing elements developed by front-end developers with server-side logic.',
      'Developed REST controllers using Spring Data REST to serve the UI with required JSON data.'
    ],
    technologies: ['Spring MVC', 'React', 'Spring Boot', 'HTML', 'CSS', 'Backbone.js', 'Git', 'REST APIs', 'Java'],
    achievements: [
      'Full-stack web application development',
      'Microservices architecture implementation',
      'RESTful API design and development'
    ],
    type: 'past'
  }
];

export const Experience: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<string>(experienceData[0].id);
  const currentExperience = experienceData.find(exp => exp.id === selectedExperience);

  return (
    <section id="experience" className={styles.experienceSection}>
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            6+ years of experience building data-intensive applications and driving business impact 
            through analytics, machine learning, and innovative software solutions.
          </p>
        </div>

        {/* Career Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">4</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Positions</div>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <Calendar className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">6+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Years</div>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <MapPin className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">2</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Cities</div>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Domains</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Timeline */}
          <div className="lg:col-span-1">
            <Timeline 
              experiences={experienceData}
              selectedId={selectedExperience}
              onSelect={setSelectedExperience}
            />
          </div>

          {/* Right: Job Details */}
          <div className="lg:col-span-2">
            {currentExperience && (
              <JobCard experience={currentExperience} />
            )}
          </div>
        </div>

        {/* All Technologies Used */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Technologies & Tools
          </h3>
          <SkillTags experiences={experienceData} />
        </div>
      </div>
    </section>
  );
};