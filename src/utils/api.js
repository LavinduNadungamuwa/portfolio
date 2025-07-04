const API_BASE_URL = import.meta.env.PROD 
  ? '/api' 
  : 'http://localhost:5000/api';

// Generate session ID for analytics
const getSessionId = () => {
  if (typeof window === 'undefined') return 'server-side';
  
  let sessionId = localStorage.getItem('portfolio_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    localStorage.setItem('portfolio_session_id', sessionId);
  }
  return sessionId;
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Session-ID': getSessionId(),
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text || 'Unknown error' };
    }

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    // Check if it's a network error
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('Network Error - Backend server may be down:', error);
      throw new Error('Backend server is not responding. Please check if the server is running.');
    }
    
    console.error('API Error:', error);
    throw error;
  }
};

// Contact API
export const contactAPI = {
  submit: async (formData) => {
    return apiRequest('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  }
};

// Projects API
export const projectsAPI = {
  getAll: async (featured = false, limit = 0) => {
    const params = new URLSearchParams();
    if (featured) params.append('featured', 'true');
    if (limit > 0) params.append('limit', limit.toString());
    
    return apiRequest(`/projects?${params.toString()}`);
  },

  getById: async (id) => {
    return apiRequest(`/projects/${id}`);
  },

  trackClick: async (id, type) => {
    return apiRequest(`/projects/${id}/click`, {
      method: 'POST',
      body: JSON.stringify({ type })
    });
  }
};

// Analytics API
export const analyticsAPI = {
  track: async (type, data) => {
    try {
      return await apiRequest('/analytics/track', {
        method: 'POST',
        body: JSON.stringify({
          type,
          data,
          sessionId: getSessionId()
        })
      });
    } catch (error) {
      // Don't throw analytics errors to avoid breaking user experience
      console.warn('Analytics tracking failed (this is normal if database is unavailable):', error.message);
      return { success: true, message: 'Analytics tracking skipped' };
    }
  },

  trackPageView: async (page) => {
    return analyticsAPI.track('page_view', { page });
  },

  trackSectionView: async (section) => {
    return analyticsAPI.track('section_view', { section });
  },

  trackProjectClick: async (projectId, type) => {
    return analyticsAPI.track('project_click', { projectId, type });
  },

  trackContactForm: async () => {
    return analyticsAPI.track('contact_form', { timestamp: new Date().toISOString() });
  },

  trackResumeDownload: async () => {
    return analyticsAPI.track('download_resume', { timestamp: new Date().toISOString() });
  }
};

// Admin API
export const adminAPI = {
  login: async (credentials) => {
    return apiRequest('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  verify: async (token) => {
    return apiRequest('/admin/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  getDashboard: async (token) => {
    return apiRequest('/admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
};

export default {
  contactAPI,
  projectsAPI,
  analyticsAPI,
  adminAPI
};