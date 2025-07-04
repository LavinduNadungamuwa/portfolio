import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projectsAPI } from '../utils/api.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default projects as fallback
  const defaultProjects = [
    {
      id: 'default-1',
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with user authentication, product management, and payment integration. Features include shopping cart, order tracking, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      githubUrl: "https://github.com/username/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.com",
      imageUrl: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 'default-2',
      title: "Task Management App",
      description: "A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features. Built with modern web technologies.",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
      githubUrl: "https://github.com/username/task-manager",
      liveUrl: "https://taskmanager-demo.com",
      imageUrl: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 'default-3',
      title: "Weather Analytics Dashboard",
      description: "An interactive dashboard that displays weather data with beautiful visualizations and forecasting. Includes location-based weather tracking and historical data analysis.",
      technologies: ["Python", "Django", "Chart.js", "Weather API"],
      githubUrl: "https://github.com/username/weather-dashboard",
      liveUrl: "https://weather-analytics.com",
      imageUrl: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 'default-4',
      title: "AI-Powered Chat Bot",
      description: "An intelligent chatbot using natural language processing to provide customer support. Features include sentiment analysis, automated responses, and learning capabilities.",
      technologies: ["Python", "TensorFlow", "Flask", "Natural Language Processing"],
      githubUrl: "https://github.com/username/ai-chatbot",
      liveUrl: "https://chatbot-demo.com",
      imageUrl: "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectsAPI.getAll(false, 4);
        
        if (response.success && response.data.length > 0) {
          setProjects(response.data);
        } else {
          setProjects(defaultProjects);
        }
      } catch (error) {
        console.warn('Failed to fetch projects from API, using defaults:', error);
        setProjects(defaultProjects);
        setError('Using demo projects (API unavailable)');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-600"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                  <div className="flex gap-2 mb-6">
                    <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              My Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills in full-stack development, 
            UI/UX design, and problem-solving.
          </p>
          {error && (
            <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
              {error}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id || index} {...project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span>View All Projects</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;