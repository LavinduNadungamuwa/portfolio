import express from 'express';
import { body, validationResult } from 'express-validator';
import Project from '../models/Project.js';
import { isDatabaseConnected } from '../config/database.js';

const router = express.Router();

// Default projects for when database is unavailable
const defaultProjects = [
  {
    _id: 'default-1',
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with user authentication, product management, and payment integration. Features include shopping cart, order tracking, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    githubUrl: "https://github.com/username/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.com",
    imageUrl: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    status: 'published',
    views: 0,
    clicks: { github: 0, live: 0 },
    order: 1
  },
  {
    _id: 'default-2',
    title: "Task Management App",
    description: "A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features. Built with modern web technologies.",
    technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    githubUrl: "https://github.com/username/task-manager",
    liveUrl: "https://taskmanager-demo.com",
    imageUrl: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    status: 'published',
    views: 0,
    clicks: { github: 0, live: 0 },
    order: 2
  },
  {
    _id: 'default-3',
    title: "Weather Analytics Dashboard",
    description: "An interactive dashboard that displays weather data with beautiful visualizations and forecasting. Includes location-based weather tracking and historical data analysis.",
    technologies: ["Python", "Django", "Chart.js", "Weather API"],
    githubUrl: "https://github.com/username/weather-dashboard",
    liveUrl: "https://weather-analytics.com",
    imageUrl: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    status: 'published',
    views: 0,
    clicks: { github: 0, live: 0 },
    order: 3
  },
  {
    _id: 'default-4',
    title: "AI-Powered Chat Bot",
    description: "An intelligent chatbot using natural language processing to provide customer support. Features include sentiment analysis, automated responses, and learning capabilities.",
    technologies: ["Python", "TensorFlow", "Flask", "Natural Language Processing"],
    githubUrl: "https://github.com/username/ai-chatbot",
    liveUrl: "https://chatbot-demo.com",
    imageUrl: "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
    status: 'published',
    views: 0,
    clicks: { github: 0, live: 0 },
    order: 4
  }
];

// Get all published projects
router.get('/', async (req, res) => {
  try {
    // Check if database is connected
    if (!isDatabaseConnected()) {
      console.log('Projects API: Using default projects - database not connected');
      
      const featured = req.query.featured === 'true';
      const limit = parseInt(req.query.limit) || 0;

      let projects = defaultProjects.filter(p => p.status === 'published');
      
      if (featured) {
        projects = projects.filter(p => p.featured);
      }

      if (limit > 0) {
        projects = projects.slice(0, limit);
      }

      return res.json({
        success: true,
        data: projects,
        message: 'Using default projects (database unavailable)'
      });
    }

    const featured = req.query.featured === 'true';
    const limit = parseInt(req.query.limit) || 0;

    let query = { status: 'published' };
    if (featured) {
      query.featured = true;
    }

    let projectsQuery = Project.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 });

    if (limit > 0) {
      projectsQuery = projectsQuery.limit(limit);
    }

    const projects = await projectsQuery;

    res.json({
      success: true,
      data: projects
    });

  } catch (error) {
    console.error('Get projects error:', error);
    
    // Fallback to default projects on error
    const featured = req.query.featured === 'true';
    const limit = parseInt(req.query.limit) || 0;

    let projects = defaultProjects.filter(p => p.status === 'published');
    
    if (featured) {
      projects = projects.filter(p => p.featured);
    }

    if (limit > 0) {
      projects = projects.slice(0, limit);
    }

    res.json({
      success: true,
      data: projects,
      message: 'Using default projects (database error)'
    });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    // Check if database is connected
    if (!isDatabaseConnected()) {
      const project = defaultProjects.find(p => p._id === req.params.id && p.status === 'published');
      
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      return res.json({
        success: true,
        data: project,
        message: 'Using default project (database unavailable)'
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project || project.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Increment view count
    project.views += 1;
    await project.save();

    res.json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project'
    });
  }
});

// Track project clicks
router.post('/:id/click', async (req, res) => {
  try {
    // Check if database is connected
    if (!isDatabaseConnected()) {
      console.log('Project click tracking skipped - database not connected');
      return res.json({
        success: true,
        message: 'Click tracking skipped (database unavailable)'
      });
    }

    const { type } = req.body; // 'github' or 'live'
    
    if (!['github', 'live'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid click type'
      });
    }

    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Increment click count
    project.clicks[type] += 1;
    await project.save();

    res.json({
      success: true,
      message: 'Click tracked successfully'
    });

  } catch (error) {
    console.error('Track click error:', error);
    
    // Return success to avoid breaking user experience
    res.json({
      success: true,
      message: 'Click tracking failed gracefully'
    });
  }
});

// Admin routes for project management
const projectValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('githubUrl')
    .isURL()
    .matches(/^https:\/\/github\.com\/.*/)
    .withMessage('Please enter a valid GitHub URL'),
  body('liveUrl')
    .isURL()
    .withMessage('Please enter a valid live URL'),
  body('imageUrl')
    .isURL()
    .withMessage('Please enter a valid image URL')
];

// Create new project (admin)
router.post('/admin/create', projectValidation, async (req, res) => {
  try {
    // Check if database is connected
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database unavailable - cannot create projects'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const project = new Project(req.body);
    await project.save();

    res.status(201).json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
});

// Update project (admin)
router.put('/admin/:id', projectValidation, async (req, res) => {
  try {
    // Check if database is connected
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database unavailable - cannot update projects'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
});

// Delete project (admin)
router.delete('/admin/:id', async (req, res) => {
  try {
    // Check if database is connected
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database unavailable - cannot delete projects'
      });
    }

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
});

export default router;