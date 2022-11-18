import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { StoryModule } from './story/story.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.env',
      // isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    PostModule,
    StoryModule,
    MessageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
