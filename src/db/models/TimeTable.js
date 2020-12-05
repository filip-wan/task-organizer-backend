import { itemSchema } from './Item.js';
import mongoose from 'mongoose';

const timeTableSchema = mongoose.Schema({
  ...itemSchema.obj,
  google: {
    type: String,
  },
  events: [
    {
      dateCreated: {
        required: true,
        type: Date,
      },
      dateStart: {
        required: true,
        type: Date,
      },
      dateEnd: {
        required: true,
        type: Date,
      },
      googleId: {
        type: String,
      },
      notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
      },
      connections: [
        {
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
      description: {
        type: String,
      },
      summary: {
        type: String,
      },
      recurrence: [
        {
          type: String,
        },
      ],
    },
  ],
});

export const TimeTable = mongoose.model('TimeTable', timeTableSchema);
