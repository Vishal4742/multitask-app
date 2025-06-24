import mongoose, { Document, Schema } from 'mongoose';

export interface IReminder extends Document {
  message: string;
  date: Date;
  isArchived: boolean;
  eventId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}

const ReminderSchema: Schema = new Schema({
  message: { type: String, required: true },
  date: { type: Date, required: true },
  isArchived: { type: Boolean, default: false },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IReminder>('Reminder', ReminderSchema); 