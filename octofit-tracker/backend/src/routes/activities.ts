import express, { Router } from 'express';
import { Activity } from '../models/Activity';

const router: Router = express.Router();

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get activities by user
router.get('/user/:userId', async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user activities' });
  }
});

// Create activity
router.post('/', async (req, res) => {
  try {
    const { userId, type, duration, caloriesBurned, distance, date, notes } = req.body;
    const activity = new Activity({ userId, type, duration, caloriesBurned, distance, date, notes });
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

export default router;
