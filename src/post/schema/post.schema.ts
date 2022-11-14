import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type PostDocument = mongoose.HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop()
  content: string;

  @Prop()
  caption: string;

  @Prop(
    raw({
      writer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //comment az kie
      commentContent: { type: String },
      refId: { type: mongoose.Schema.Types.ObjectId }, //'comments.id' //commentId
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // ki like karde
      date: Date,
    }),
  )
  comments: Array<any>;
  // comments: Array<??>;

  @Prop(
    raw({
      PostId: { type: mongoose.Schema.Types.ObjectId },
      status: { type: String, enum: ['pending', 'accepted'] },
    }),
  )
  followings: Post[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  closePosts: Post[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  hidePosts: Post[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  blockPosts: Post[];

  @Prop({ default: false })
  private: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);

// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// export const PostSchema = new Schema({
//   owner: { type: Schema.Types.ObjectId, ref: 'User' },
//   content: String, //url
//   caption: String,
//   comments: [
//     {
//       writer: { type: Schema.Types.ObjectId, ref: 'User' }, //comment az kie
//       commentContent: String,
//       refId: Schema.Types.ObjectId.comments, //'comments.id' //commentId
//       likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // ki like karde
//       date: Date,
//     },
//   ],
//   likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//   viewCount: Number,
// });
