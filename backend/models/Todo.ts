import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
  task: string;
  hour: number;
  isCompleted: boolean;
  isArchived: boolean;
  userId: mongoose.Types.ObjectId;
  date: Date;
}

const TodoSchema: Schema = new Schema({
  task: { type: String, required: true },
  hour: { type: Number, required: true, min: 0, max: 23 },
  isCompleted: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<ITodo>('Todo', TodoSchema); 