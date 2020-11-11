import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

export const Category = mongoose.model('Category', categorySchema);
