import mongoose from 'mongoose';
import { itemSchema } from './Item.js';

const noteSchema = mongoose.Schema({
  ...itemSchema.obj,
  deadline: {
    type: Date,
  },
});

export const Note = mongoose.model('Note', noteSchema);
