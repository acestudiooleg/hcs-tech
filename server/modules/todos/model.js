import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Please, provide "userId"',
  },
  title: {
    type: String,
    required: 'Please, provide title',
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Todo', todoSchema);
