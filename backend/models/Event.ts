import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  isOrganized: boolean;
  isArchived: boolean;
  userId: mongoose.Types.ObjectId;
  reminders: mongoose.Types.ObjectId[];
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  isOrganized: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reminders: [{ type: Schema.Types.ObjectId, ref: 'Reminder' }],
});

export default mongoose.model<IEvent>('Event', EventSchema); 