import mongoose from 'mongoose';

/**
 * MongoDB connection configuration for octofit_db
 */

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB - octofit_db');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export function disconnectDatabase() {
  return mongoose.disconnect();
}

export default mongoose;
