import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
  },
  recurring: {
    type: Boolean,
  },
  date: {
    type: String,
    required: true,
  },
  day: {
    type: String,
  },
  label: {
    type: String,
  },
  description: {
    type: String,
  },
  email: {
    type: String,
  },
});

export const Notification = mongoose.model('Notification', notificationSchema);
