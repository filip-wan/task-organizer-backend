import mongoose from 'mongoose';

export const itemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  position: {
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
  },
  size: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
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
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});
