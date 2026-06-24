import express, { Router } from 'express';
import { Activity } from '../models/Activity';
import { User } from '../models/User';

const router: Router = express.Router();

// Get leaderboard by calories burned
router.get('/calories', async (req, res) => {
  try {
    const leaderboard = await Activity.aggregate([
      {
        $group: {
          _id: '$userId',
          totalCalories: { $sum: '$caloriesBurned' },
          activityCount: { $sum: 1 },
        },
      },
      { $sort: { totalCalories: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
    ]);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get leaderboard by distance
router.get('/distance', async (req, res) => {
  try {
    const leaderboard = await Activity.aggregate([
      { $match: { distance: { $ne: null } } },
      {
        $group: {
          _id: '$userId',
          totalDistance: { $sum: '$distance' },
          activityCount: { $sum: 1 },
        },
      },
      { $sort: { totalDistance: -1 } },
      { $limit: 10 },
    ]);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch distance leaderboard' });
  }
});

export default router;
