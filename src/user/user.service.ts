import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  editProfile(user, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(
      { _id: user.userId },
      {
        username: updateUserDto.username,
        fullname: updateUserDto.fullName,
        //photo: updateUserDto.photo
        email: updateUserDto.email,
        phoneNumber: updateUserDto.phoneNumber,
        age: updateUserDto.age,
        gender: updateUserDto.gender,
        bio: updateUserDto.bio,
        visiblity: updateUserDto.visiblity,
        //changePassword
      },
    );
  }

  async getUser(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username });
  }

  async getUserData(username: string, _user?): Promise<User | any> {
    try {
      const user = await this.userModel.findOne({ username: username });
      if (user.visiblity === 'public') {
        return user;
      } else {
        const isFollowing = await this.userModel.findOne({
          username: user.username,
          followings: user, //{ userId: _user._id },
        });
        if (isFollowing !== null || _user.username === username) {
          return user;
        }
      }
      return ForbiddenException;
    } catch (error) {
      return error.message;
    }
  }

  getUserFollowers(user) {
    return this.userModel.findById(user.userId).select('followers'); //OR
    // return this.userModel.find({ username: user.username }, { followers: 1 });
  }

  async follow(follow, user) {
    try {
      const wantedFollow = await this.userModel.findOne({
        username: follow.name,
      });
      if (follow.name !== user.username) {
        if (wantedFollow.visiblity === 'public') {
          //transaction bayad beshe
          await this.userModel.updateOne(
            { username: follow.name },
            {
              $push: {
                followers: {
                  userId: wantedFollow,
                  status: 'accepted',
                },
              },
            },
          );
          return await this.userModel.updateOne(
            { username: user.username },
            {
              $push: {
                followings: {
                  userId: wantedFollow,
                  status: 'accepted',
                },
              },
            },
          );
        }
        // if (wantedFollow.visiblity === 'private') {}
        else {
          await this.userModel.updateOne(
            { username: follow.name },
            {
              $push: {
                followers: {
                  userId: user.userId, // await this.userModel.findOne({ username: user.username })
                  status: 'pending',
                },
              },
            },
          );
          return await this.userModel.updateOne(
            { username: user.username },
            {
              $push: {
                followings: {
                  userId: wantedFollow,
                  status: 'pending',
                },
              },
            },
          );
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async unfollow(follow, user) {
    return this.userModel.updateOne(
      { username: user.username },
      {
        $pull: {
          followings: await this.userModel.findOne({ username: follow.name }),
        },
      },
    );
  }

  // async showFollowRequests(username) {}

  async manageFollowRequests(follow, me) {
    try {
      const follower = await this.userModel.findOne({ username: follow.name });
      if (follow.res == 'yes') {
        await this.userModel.updateOne(
          { username: follower.username },
          { $set: { 'followings.$[elem].status': 'accepted' } },
          { arrayFilters: [{ 'elem.userId': me.userId }] },
        );
        return this.userModel.updateOne(
          { username: me.username },
          { $set: { 'followers.$[elem].status': 'accepted' } },
          { arrayFilters: [{ 'elem.userId': follower._id }] },
        );
      }
      await this.userModel.updateOne(
        //unfollow ham mikone
        { username: follower.username },
        { $pull: { followings: { userId: me.userId } } },
      );
      return this.userModel.updateOne(
        //unfollow ham mikone
        { username: me.username, followers: follower },
        { $pull: { followers: follower } },
      );
    } catch (error) {
      return error.message;
    }
  }

  async addFollower(follow: string, username: string) {
    try {
      const wantedFollower = await this.userModel.findOne({
        username: follow,
      });
      if (wantedFollower.username !== username) {
        //khodesh nabayad add beshe
        return this.userModel.updateOne(
          { username: username },
          { $push: { followers: wantedFollower } },
        );
      }
    } catch (error) {
      return NotFoundException;
    }
  }
  async addFollowing(followName: string, username: string) {
    try {
      const wantedFollower = await this.userModel.findOne({
        username: followName,
      });
      if (wantedFollower.username !== username) {
        //khodesh nabayad add beshe
        return this.userModel.updateOne(
          { username: username },
          {
            $push: {
              followings: {
                userId: wantedFollower,
                status:
                  wantedFollower.visiblity === 'private'
                    ? 'pendding'
                    : 'accepted',
              },
            },
          },
        );
      }
    } catch (error) {
      return NotFoundException;
    }
  }

  remove(user) {
    return this.userModel.remove({ username: user.username }).exec(); //OR
    // return this.userModel.findByIdAndRemove(user.userId).exec();
  }

  async blockUser(blockName: string, username: string) {
    try {
      await this.userModel.updateOne( // unfollow
        { username: username },
        {
          $pull: {
            followings: await this.userModel.findOne({ username: blockName }),
          },
        },
      );
      const blocked = await this.userModel.findOne({ username: blockName });
      return this.userModel.updateOne(
        { username: username },
        { $push: { blockUsers: blocked } },
      );
    } catch (error) {
      return error.message;
    }
  }

  async unblockUser(blockName: string, username: string) {
    try {
      const blocked = await this.userModel.findOne({ username: blockName });
      return this.userModel.updateOne(
        { username: username },
        { $pull: { blockUsers: blocked } },
      );
    } catch (error) {
      return error.message;
    }
  }

  async addCloseFriend(closeFriendName: string, username: string) {
    try {
      const closeFriend = await this.userModel.findOne({
        username: closeFriendName,
      });
      return this.userModel.updateOne(
        { username: username },
        { $push: { closeUsers: closeFriend } },
      );
    } catch (error) {
      return error.message;
    }
  }

  async delCloseFriend(closeFriendName: string, username: string) {
    try {
      const closeFriend = await this.userModel.findOne({
        username: closeFriendName,
      });
      return this.userModel.updateOne(
        { username: username },
        { $pull: { closeUsers: closeFriend } },
      );
    } catch (error) {
      return error.message;
    }
  }

  async hideUser(hiddenName: string, username: string) {
    try {
      const hidden = await this.userModel.findOne({ username: hiddenName });
      return this.userModel.updateOne(
        { username: username },
        { $push: { hideUsers: hidden } },
      );
    } catch (error) {
      return error.message;
    }
  }

  async unhideUser(hiddenName: string, username: string) {
    try {
      const hidden = await this.userModel.findOne({ username: hiddenName });
      return this.userModel.updateOne(
        { username: username },
        { $pull: { hideUsers: hidden } },
      );
    } catch (error) {
      return error.message;
    }
  }

  // async userCreation(userCreateData: createUserDto): Promise<User> {
  //   const { username, password, address, roll } = userCreateData;
  //   const user = new this.userModel({ username, password, roll });
  //   user.addresses.push(address);
  //   return user.save();
  // }

  // findAll(): Promise<User[]> {
  //   return this.userModel
  //     .find() // .find({ username: 'elham' }, { age: 1, phoneNumber: 1 })
  //     .exec();
  // }

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.userModel.find(user => user.username === username);
  // }

  // async findOne(username: string): Promise<any> {
  //   const user = await this.userModel.findOne({ username: username });
  //   return user;
  // }
}
