import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  gender: string;

  @Prop()
  age: number;

  @Prop({ type: String, enum: ['public', 'private'], default: 'public' })
  visiblity: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  followers: User[];

  @Prop(
    raw({
      userId: { type: mongoose.Schema.Types.ObjectId },
      status: { type: String, enum: ['pending', 'accepted'] },
    }),
  )
  followings: Array<any>;
  // followings: Array<??>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  closeUsers: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  hideUsers: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  blockUsers: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// export const UserSchema = new Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   password: String,
//   followers: [Schema.Types.ObjectId],
//   followings: [
//     {
//       userId: Schema.Types.ObjectId,
//       status: { type: String, enum: ['pending', 'accepted'] },
//     },
//   ],
//   closeUsers: [Schema.Types.ObjectId],
//   hideUsers: [Schema.Types.ObjectId],
//   blockUsers: [Schema.Types.ObjectId],
//   private: {
//     type: Boolean,
//     default: false,
//   },
// });

// 1. USER => id, username, password, followers: [userId], followings: [{userId, status}], closeUsers: [userId], hideUsers: [userId], blockUsers: [userId], private: bool,
// 2. POST	=> id, userId, content, caption, comments: [{userId, comment, refId, likes: [userId]}], likes: [userId], viewCount,
// 3. STORY => id, userId, content, expiration
// 4. MESSAGE => id, from, to, content, date
