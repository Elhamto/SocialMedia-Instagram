import mongoose from 'mongoose';
const { Schema } = mongoose;

export const MessageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  date: Date.now,
});
