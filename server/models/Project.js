import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  githubUrl: {
    type: String,
    required: [true, 'GitHub URL is required'],
    match: [/^https:\/\/github\.com\/.*/, 'Please enter a valid GitHub URL']
  },
  liveUrl: {
    type: String,
    required: [true, 'Live URL is required'],
    match: [/^https?:\/\/.*/, 'Please enter a valid URL']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    match: [/^https?:\/\/.*/, 'Please enter a valid image URL']
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  views: {
    type: Number,
    default: 0
  },
  clicks: {
    github: { type: Number, default: 0 },
    live: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
projectSchema.index({ featured: -1, order: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });

export default mongoose.model('Project', projectSchema);