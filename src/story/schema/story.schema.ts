import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type StoryDocument = mongoose.HydratedDocument<Story>;

@Schema()
export class Story {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop()
  content: string; //url

  @Prop()
  expiration: Date; //lazeme? nemishe hamaro 24h goft?

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }] })
  likes: User[];

  // @Prop()
  // reply: string;
}

export const StorySchema = SchemaFactory.createForClass(Story);
