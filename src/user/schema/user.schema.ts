import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Post } from 'src/post/schema/post.schema';

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
  photo: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  bio: string;

  @Prop({ type: String, enum: ['public', 'private'], default: 'public' })
  visiblity: string;

  @Prop(
    raw({
      userId: { type: mongoose.Schema.Types.ObjectId },
      status: { type: String, enum: ['pending', 'accepted'] },
    }),
  )
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  followers: User[];

  @Prop(
    raw({
      userId: { type: mongoose.Schema.Types.ObjectId },
      status: { type: String, enum: ['pending', 'accepted'] },
    }),
  )
  followings: User[];
  // followings: Array<any>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  closeUsers: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  hideUsers: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  blockUsers: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Post' })
  posts: Post[];
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
