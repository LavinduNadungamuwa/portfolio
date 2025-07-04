import express from 'express';
import { body, validationResult } from 'express-validator';
import Project from '../models/Project.js';

const router = express.Router();

// Get all published projects
router.get('/', async (req, res) => {
  try {
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
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects'
    });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
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
    res.status(500).json({
      success: false,
      message: 'Failed to track click'
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