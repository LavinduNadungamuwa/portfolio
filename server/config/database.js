import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    console.log('🔄 Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });

    console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
    
    // In development, continue without database
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚠️  Running in development mode without database');
      console.log('💡 To use database features, start MongoDB with: mongod');
      console.log('📝 Database-dependent features will be disabled');
      return false;
    }
    
    console.error('🚨 Production requires database connection');
    process.exit(1);
  }
};

export default connectDB;