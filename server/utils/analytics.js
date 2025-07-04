import Analytics from '../models/Analytics.js';

export const trackEvent = async (type, data, req) => {
  try {
    const analytics = new Analytics({
      type,
      data,
      sessionId: req.headers['x-session-id'] || 'anonymous',
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'Unknown',
      referrer: req.get('Referrer') || ''
    });

    await analytics.save();
    return analytics;
  } catch (error) {
    console.error('Analytics tracking error:', error);
    // Don't throw error to avoid breaking the main functionality
    return null;
  }
};

export const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};