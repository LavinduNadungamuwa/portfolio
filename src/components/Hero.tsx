import React from 'react';
import { ChevronDown, Download, Sparkles } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics.js';

const Hero = () => {
  const { trackResumeDownload } = useAnalytics();

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeDownload = () => {
    trackResumeDownload();
    alert('Resume download would start here. In production, this would download your actual resume PDF.');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 gradient-bg-primary">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/15 to-indigo-600/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-pink-600/15 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full blur-3xl animate-float delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto container-padding text-center relative z-10">
        <div className="animate-slide-up">
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-full animate-spin-slow animate-glow"></div>
              <div className="absolute inset-1 glass-card-strong rounded-full p-1">
                <img 
                  src="/profile.jpg"
                  alt="Lavindu Nadungamuwa"
                  className="w-full h-full rounded-full object-cover shadow-2xl"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                    if (e.target.nextElementSibling) {
                      (e.target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-full items-center justify-center shadow-2xl hidden">
                  <span className="text-2xl font-bold text-white tracking-wider">LN</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            <span className="text-sm font-semibold text-muted uppercase tracking-widest">
              Software Engineering Student
            </span>
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Hi, I'm{' '} <br />
            <span className="text-gradient animate-gradient">
              Lavindu Nadungamuwa
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            A passionate{' '}
            <span className="font-bold text-gradient">
              Software Engineering Undergraduate
            </span>
            {' '}dedicated to building innovative solutions and creating exceptional digital experiences that make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group btn-primary flex items-center gap-2 focus-ring"
            >
              <span>View My Work</span>
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
            
            <button 
              onClick={handleResumeDownload}
              className="group btn-secondary flex items-center gap-2 focus-ring"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              <span>Download Resume</span>
            </button>
          </div>
          
          <button
            onClick={scrollToNext}
            className="animate-bounce text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 focus-ring rounded-full p-2"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;