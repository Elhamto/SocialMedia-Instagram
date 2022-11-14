import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { StoryModule } from './story/story.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    PostModule,
    StoryModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
