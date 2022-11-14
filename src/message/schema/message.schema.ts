import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type MessageDocument = mongoose.HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  from: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  to: User;

  @Prop()
  content: string;

  @Prop()
  date: Date;

  @Prop()
  liked: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
