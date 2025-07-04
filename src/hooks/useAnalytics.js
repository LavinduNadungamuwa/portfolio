import { useEffect } from 'react';
import { analyticsAPI } from '../utils/api.js';

export const useAnalytics = () => {
  // Track page view on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      analyticsAPI.trackPageView(window.location.pathname);
    }
  }, []);

  // Track section views with intersection observer
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            analyticsAPI.trackSectionView(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5, // Track when 50% of section is visible
        rootMargin: '0px 0px -100px 0px' // Offset to avoid tracking too early
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return {
    trackProjectClick: analyticsAPI.trackProjectClick,
    trackContactForm: analyticsAPI.trackContactForm,
    trackResumeDownload: analyticsAPI.trackResumeDownload
  };
};