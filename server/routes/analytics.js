import express from 'express';
import Analytics from '../models/Analytics.js';

const router = express.Router();

// Track analytics event
router.post('/track', async (req, res) => {
  try {
    const { type, data, sessionId } = req.body;

    if (!type || !data || !sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const analytics = new Analytics({
      type,
      data,
      sessionId,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent') || 'Unknown',
      referrer: req.get('Referrer') || ''
    });

    await analytics.save();

    res.json({
      success: true,
      message: 'Analytics tracked successfully'
    });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track analytics'
    });
  }
});

// Get analytics summary (admin)
router.get('/summary', async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    
    let startDate = new Date();
    switch (period) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    const [
      totalViews,
      uniqueVisitors,
      topPages,
      topProjects,
      contactForms,
      resumeDownloads
    ] = await Promise.all([
      // Total page views
      Analytics.countDocuments({
        type: 'page_view',
        createdAt: { $gte: startDate }
      }),
      
      // Unique visitors
      Analytics.distinct('sessionId', {
        createdAt: { $gte: startDate }
      }).then(sessions => sessions.length),
      
      // Top pages
      Analytics.aggregate([
        {
          $match: {
            type: 'section_view',
            createdAt: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: '$data.section',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),
      
      // Top projects
      Analytics.aggregate([
        {
          $match: {
            type: 'project_click',
            createdAt: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: '$data.projectId',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),
      
      // Contact form submissions
      Analytics.countDocuments({
        type: 'contact_form',
        createdAt: { $gte: startDate }
      }),
      
      // Resume downloads
      Analytics.countDocuments({
        type: 'download_resume',
        createdAt: { $gte: startDate }
      })
    ]);

    res.json({
      success: true,
      data: {
        period,
        summary: {
          totalViews,
          uniqueVisitors,
          contactForms,
          resumeDownloads
        },
        topPages,
        topProjects
      }
    });

  } catch (error) {
    console.error('Analytics summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve analytics summary'
    });
  }
});

// Get detailed analytics (admin)
router.get('/detailed', async (req, res) => {
  try {
    const { type, period = '7d', page = 1, limit = 50 } = req.query;
    
    let startDate = new Date();
    switch (period) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    const query = { createdAt: { $gte: startDate } };
    if (type) {
      query.type = type;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [analytics, total] = await Promise.all([
      Analytics.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select('-ipAddress -userAgent'),
      Analytics.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        analytics,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total
        }
      }
    });

  } catch (error) {
    console.error('Detailed analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve detailed analytics'
    });
  }
});

export default router;