import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    required: true,
  },
  label: {
    type: String,
  },
  description: {
    type: String,
  },
});

export const Notification = mongoose.model('Notification', notificationSchema);
