import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function (next) {
            console.log('Hello from pre save');
            // try {
            //   if (!this.isModified('password')) {
            //     next();
            //   } else {
            //     const hashedPass = await bcrypt.hash(this['password'], 10);
            //     this['password'] = hashedPass;
            //     next();
            //   }
            // } catch (error) {
            //   next(error);
            next();
            // }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
