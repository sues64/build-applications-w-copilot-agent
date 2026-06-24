import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Workout } from '../models/Workout';

async function seedDatabase() {
  console.log('🌱 Starting OctoFit Tracker database seed...');

  try {
    await connectDatabase();

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Workout.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create test users
    const users = await User.insertMany([
      {
        username: 'octocat',
        email: 'octocat@github.com',
        displayName: 'OctoCat',
        avatar: 'https://octodex.github.com/images/original.png',
      },
      {
        username: 'codertocat',
        email: 'codertocat@github.com',
        displayName: 'Coder Tocat',
        avatar: 'https://octodex.github.com/images/codertocat.gif',
      },
      {
        username: 'fitnessocat',
        email: 'fitnessocat@github.com',
        displayName: 'Fitness Ocat',
      },
    ]);
    console.log('👥 Created test users');

    // Create test teams
    const teams = await Team.insertMany([
      {
        name: 'Octopus Squad',
        description: 'A team of fitness enthusiasts',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Code Runners',
        description: 'Developers who love to run',
        members: [users[1]._id, users[2]._id],
      },
    ]);
    console.log('🏆 Created test teams');

    // Create test activities
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        duration: 45,
        caloriesBurned: 520,
        distance: 5.2,
        date: new Date('2026-06-24'),
        notes: 'Morning jog',
      },
      {
        userId: users[0]._id,
        type: 'Cycling',
        duration: 60,
        caloriesBurned: 680,
        distance: 18.5,
        date: new Date('2026-06-23'),
        notes: 'Evening ride',
      },
      {
        userId: users[1]._id,
        type: 'Swimming',
        duration: 50,
        caloriesBurned: 450,
        date: new Date('2026-06-24'),
        notes: 'Pool workout',
      },
      {
        userId: users[2]._id,
        type: 'Yoga',
        duration: 60,
        caloriesBurned: 180,
        date: new Date('2026-06-22'),
        notes: 'Relaxing session',
      },
    ]);
    console.log('🏃 Created test activities');

    // Create test workouts
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        name: 'Chest and Triceps',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 185 },
          { name: 'Incline Dumbbell Press', sets: 3, reps: 10, weight: 65 },
          { name: 'Tricep Dips', sets: 3, reps: 12 },
        ],
        date: new Date('2026-06-24'),
        duration: 75,
      },
      {
        userId: users[1]._id,
        name: 'Leg Day',
        exercises: [
          { name: 'Squats', sets: 4, reps: 6, weight: 225 },
          { name: 'Leg Press', sets: 3, reps: 10, weight: 405 },
          { name: 'Lunges', sets: 3, reps: 12, weight: 45 },
        ],
        date: new Date('2026-06-23'),
        duration: 90,
      },
    ]);
    console.log('💪 Created test workout data seed');

    console.log('✅ Database seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seedDatabase();
