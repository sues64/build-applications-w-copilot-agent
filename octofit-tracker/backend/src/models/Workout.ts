import mongoose, { Schema, Document } from 'mongoose';

interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }>;
  date: Date;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        weight: { type: Number, default: null },
      },
    ],
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
