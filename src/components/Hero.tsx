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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in">
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">LN</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Software Engineering Student
            </span>
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Hi, I'm{' '} <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Lavindu Nadungamuwa
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            A passionate{' '}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Software Engineering Undergraduate
            </span>
            {' '}dedicated to building innovative solutions and creating exceptional digital experiences that make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
            >
              <span>View My Work</span>
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
            
            <button 
              onClick={handleResumeDownload}
              className="group flex items-center gap-2 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              <span>Download Resume</span>
            </button>
          </div>
          
          <button
            onClick={scrollToNext}
            className="animate-bounce text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;