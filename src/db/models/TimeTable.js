import mongoose from 'mongoose';
import { itemSchema } from './Item.js';

const timeTableSchema = mongoose.Schema({
  ...itemSchema.obj,
  google: {
    type: String,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

export const TimeTable = mongoose.model('TimeTable', timeTableSchema);
