import express, { Router } from 'express';
import { Workout } from '../models/Workout';

const router: Router = express.Router();

// Get all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find().populate('userId');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Get workouts by user
router.get('/user/:userId', async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user workouts' });
  }
});

// Create workout
router.post('/', async (req, res) => {
  try {
    const { userId, name, exercises, date, duration } = req.body;
    const workout = new Workout({ userId, name, exercises, date, duration });
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

export default router;
