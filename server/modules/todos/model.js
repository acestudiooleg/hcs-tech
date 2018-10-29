import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  isCompleted: Boolean,
});

export default mongoose.model('Todo', todoSchema);
