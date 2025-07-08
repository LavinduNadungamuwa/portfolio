import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Basic API routes to handle the frontend requests
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Contact API endpoint
app.post('/api/contact/submit', (req, res) => {
  console.log('Contact form submission:', req.body);
  res.json({ 
    success: true, 
    message: 'Message received successfully' 
  });
});

// Projects API endpoints
app.get('/api/projects', (req, res) => {
  // Return empty array for now - can be populated later
  res.json([]);
});

app.get('/api/projects/:id', (req, res) => {
  res.json({ 
    id: req.params.id, 
    title: 'Sample Project',
    description: 'This is a sample project'
  });
});

app.post('/api/projects/:id/click', (req, res) => {
  console.log(`Project ${req.params.id} clicked:`, req.body);
  res.json({ success: true });
});

// Analytics API endpoints
app.post('/api/analytics/track', (req, res) => {
  console.log('Analytics event:', req.body);
  res.json({ success: true, message: 'Event tracked' });
});

// Admin API endpoints
app.post('/api/admin/login', (req, res) => {
  res.json({ 
    success: false, 
    message: 'Admin functionality not implemented' 
  });
});

app.get('/api/admin/verify', (req, res) => {
  res.status(401).json({ 
    success: false, 
    message: 'Unauthorized' 
  });
});

app.get('/api/admin/dashboard', (req, res) => {
  res.status(401).json({ 
    success: false, 
    message: 'Unauthorized' 
  });
});

// Catch-all for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});