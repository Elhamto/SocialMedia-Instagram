import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getUser(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username });
  }

  async getUserData(username: string, req?): Promise<User> {
    try {
      const user = await this.userModel.findOne({ username: username });
      if (user.visiblity === 'public') {
        return user;
      } else {
        const isFollowing = await this.userModel.findOne({
          username: req.user.username,
          followings: user, //{ userId: user._id },
        });
        if (isFollowing !== null || req.user.username === username) {
          return user;
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  editProfile(id, updateUserDto: UpdateUserDto) {
    console.log(id);
    return this.userModel.updateOne(
      { _id: id.id },
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

  async follow(followName: string, username: string) {
    try {
      const wantedFollow = await this.userModel.findOne({
        username: followName,
      });
      const me = await this.userModel.findOne({ username: username });
      if (wantedFollow.username !== username) {
        if (wantedFollow.visiblity === 'public') {
          //transaction bayad beshe
          await this.userModel.updateOne(
            { username: wantedFollow.username },
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
            { username: username },
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
            { username: wantedFollow.username },
            {
              $push: {
                followers: {
                  userId: me,
                  status: 'pending',
                },
              },
            },
          );
          return await this.userModel.updateOne(
            { username: username },
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

  // async showFollowRequests(username) {}

  async manageFollowRequests(username, body) {
    try {
      const follower = await this.userModel.findOne({ username: body.follow });
      if (body.res == 'yes') {
        console.log(
          follower._id,
          '*******************************',
          await this.userModel.aggregate([
            {
              $lookup: {
                from: 'UserFollow',
                let: {
                  id: '$_id',
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$$id', '$follower._id'],
                      },
                      status: 'pending',
                    },
                  },
                ],
                as: 'followers',
              },
            },
          ]),
        );

        // return await this.userModel.findOneAndUpdate(
        //   { username: username },
        //   {
        //     $set: {
        //       [`followers.$[outer].status`]: 'accepted',
        //     },
        //   },
        //   {
        //     arrayFilters: [{ 'outer.userId': follower._id }],
        //   },
        //   function (err, response) {
        //     if (err) console.log(err);
        //     console.log(response);
        //   },
        // );

        // aggregate([
        //   { $match: { username: username, followers: { userId: follower } } },
        //   { $addFields: { followers: ['$status', 'accepted'] } },
        // ]);

        // updateOne(
        //   { username: username, followers: { userId: follower } },
        //   { $set: { 'followers.$.status': 'accepted' } },
        //   {
        //     upsert: true,
        //     runValidators: true,
        //   },
        // );

        // findOneAndUpdate(
        //   { username: username },
        //   { $set: { 'followers.$[el].status': 'accepted' } },
        //   {
        //     arrayFilters: [{ 'el.userId': follower }],
        //     new: true,
        //   },
        // );
        // updateOne(
        //   { username: username, followers: follower },
        //   { $set: {'followers.$.status': 'accepted' } },
        // );
      }
      return this.userModel.updateOne(
        { username: username, followers: follower },
        { $pull: { followers: follower } },
      );
    } catch (error) {
      return error.message;
    }
  }

  remove(username: string) {
    return this.userModel.remove({ username: username }).exec();
  }

  async blockUser(username, body) {
    try {
      const blocked = await this.userModel.findOne({ username: body.block });
      return this.userModel.updateOne(
        { username: username },
        { $push: { blockUsers: blocked } },
      );
    } catch (error) {
      return error.message;
    }
  }

  async unblockUser(username, body) {
    try {
      const blocked = await this.userModel.findOne({ username: body.block });
      return this.userModel.updateOne(
        { username: username },
        { $pull: { blockUsers: blocked } },
      );
    } catch (error) {
      return error.message;
    }
  }

  async addCloseUser(username, body) {
    try {
      const close = await this.userModel.findOne({ username: body.block });
      return this.userModel.updateOne(
        { username: username },
        { $push: { closeUsers: close } },
      );
    } catch (error) {
      return error.message;
    }
  }

  async delCloseUser(username, body) {
    try {
      const close = await this.userModel.findOne({ username: body.block });
      return this.userModel.updateOne(
        { username: username },
        { $pull: { closeUsers: close } },
      );
    } catch (error) {
      return error.message;
    }
  }

  async hideUser(username, body) {
    try {
      const hidden = await this.userModel.findOne({ username: body.block });
      return this.userModel.updateOne(
        { username: username },
        { $push: { hideUsers: hidden } },
      );
    } catch (error) {
      return error.message;
    }
  }

  async unhideUser(username, body) {
    try {
      const hidden = await this.userModel.findOne({ username: body.block });
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

  // findOne(id: string): Promise<User | undefined> {
  //   return this.userModel.findById(id).exec();
  // }

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.userModel.find(user => user.username === username);
  // }

  // async findOne(username: string): Promise<any> {
  //   const user = await this.userModel.findOne({ username: username });
  //   return user;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
