import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['page_view', 'section_view', 'project_click', 'contact_form', 'download_resume']
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  referrer: {
    type: String,
    default: ''
  },
  sessionId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Indexes for analytics queries
analyticsSchema.index({ type: 1, createdAt: -1 });
analyticsSchema.index({ sessionId: 1 });
analyticsSchema.index({ createdAt: -1 });

export default mongoose.model('Analytics', analyticsSchema);