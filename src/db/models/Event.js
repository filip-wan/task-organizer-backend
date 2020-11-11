import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
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
  recurrency: {
    rule: {
      count: {
        type: Number,
      },
      frequency: {
        type: String,
      },
      interval: {
        type: Number,
      },
      byDay: {
        type: String,
      },
      byMonthDay: {
        type: Number,
      },
    },
    exceptions: [
      [
        {
          date: { type: Date },
        },
      ],
    ],
  },
});

export const Event = mongoose.model('Event', eventSchema);
