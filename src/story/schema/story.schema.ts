import mongoose from 'mongoose';
const { Schema } = mongoose;

export const StorySchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String, //url
  expiration: Date,
});
