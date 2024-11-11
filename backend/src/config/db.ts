import mongoose from 'mongoose';
import environment from './env';

const MONGO_URI = environment.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB(); // Attempt to reconnect on disconnection
});

export default connectDB;