import mongoose from 'mongoose';
import { itemSchema } from './Item.js';

const todoSchema = mongoose.Schema({
  ...itemSchema.obj,
  items: [
    {
      text: {
        required: true,
        type: String,
      },
      state: {
        required: true,
        type: Boolean,
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
    },
  ],
  deadline: {
    type: Date,
  },
});

export const Todo = mongoose.model('Todo', todoSchema);
