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
      // refId: { type: mongoose.Schema.Types.ObjectId,  ref: 'Comment' }, //'comments.id' //commentId
      replies: {
        writer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        commentContent: { type: String },
      },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // ki like karde
      date: Date,
    }),
  )
  comments: Array<any>;
  // comments: Array<??>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  likes: User[];

  @Prop()
  viewCount: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
