import React from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { projectsAPI } from '../utils/api.js';
import { useAnalytics } from '../hooks/useAnalytics.js';

interface ProjectCardProps {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  imageUrl
}) => {
  const { trackProjectClick } = useAnalytics();

  const handleLinkClick = async (type: 'github' | 'live', url: string) => {
    if (id) {
      try {
        await projectsAPI.trackClick(id, type);
        trackProjectClick(id, type);
      } catch (error) {
        console.warn('Failed to track project click:', error);
      }
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group card-interactive overflow-hidden hover:border-blue-200/50 dark:hover:border-blue-700/50">
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-1 glass-card px-3 py-1 rounded-full shadow-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Featured</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed font-medium">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full font-semibold border border-blue-200/50 dark:border-blue-700/50 hover:scale-105 transition-transform duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => handleLinkClick('github', githubUrl)}
            className="group/btn flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-semibold focus-ring rounded-lg px-2 py-1"
          >
            <Github size={18} className="group-hover/btn:animate-pulse" />
            <span className="text-sm font-medium">Code</span>
          </button>
          <button
            onClick={() => handleLinkClick('live', liveUrl)}
            className="group/btn flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-semibold focus-ring rounded-lg px-2 py-1"
          >
            <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            <span className="text-sm font-medium">Live Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;