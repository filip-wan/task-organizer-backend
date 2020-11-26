import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  google: {
    type: String,
  },
  facebook: {
    type: String,
  },
  github: {
    type: String,
  },
  credentials: {
    _accessToken: {
      type: String,
    },
    _refreshToken: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);
