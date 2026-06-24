/**
 * Seed the octofit_db database with test data
 * 
 * This script initializes the octofit_db database with sample data for all collections
 * including users, teams, activities, leaderboard, and workouts.
 */

import mongoose from 'mongoose';

// Database connection configuration
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

// Team Schema
const teamSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

// Activity Schema
const activitySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  type: String,
  duration: Number,
  calories: Number,
  date: { type: Date, default: Date.now }
});

// Leaderboard Schema
const leaderboardSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  score: Number,
  rank: Number,
  updatedAt: { type: Date, default: Date.now }
});

// Workout Schema
const workoutSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  exercises: [String],
  difficulty: String,
  createdAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const Team = mongoose.model('Team', teamSchema);
const Activity = mongoose.model('Activity', activitySchema);
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
const Workout = mongoose.model('Workout', workoutSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    // Seed Users
    const users = await User.insertMany([
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Smith', email: 'bob@example.com' },
      { name: 'Charlie Brown', email: 'charlie@example.com' }
    ]);

    // Seed Teams
    const teams = await Team.insertMany([
      { name: 'Fitness Warriors', description: 'Elite fitness group' },
      { name: 'Morning Runners', description: 'Early bird exercise club' }
    ]);

    // Seed Activities
    await Activity.insertMany([
      { userId: users[0]._id, type: 'Running', duration: 30, calories: 300 },
      { userId: users[1]._id, type: 'Cycling', duration: 45, calories: 400 },
      { userId: users[2]._id, type: 'Swimming', duration: 60, calories: 500 }
    ]);

    // Seed Leaderboard
    await Leaderboard.insertMany([
      { userId: users[0]._id, score: 1500, rank: 1 },
      { userId: users[1]._id, score: 1200, rank: 2 },
      { userId: users[2]._id, score: 1000, rank: 3 }
    ]);

    // Seed Workouts
    await Workout.insertMany([
      { name: 'Morning Cardio', duration: 30, exercises: ['Running', 'Jumping Jacks'], difficulty: 'Medium' },
      { name: 'Strength Training', duration: 45, exercises: ['Squats', 'Bench Press', 'Deadlifts'], difficulty: 'Hard' },
      { name: 'Yoga Basics', duration: 60, exercises: ['Downward Dog', 'Child Pose', 'Warrior'], difficulty: 'Easy' }
    ]);

    console.log('Database seeded successfully!');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
