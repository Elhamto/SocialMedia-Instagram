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
      const accessToken = req.headers.authorization.slice(7);
      // access token bayad decode beshe
      // const decodedJwtAccessToken = this.jwtService.decode(accessToken);
      const user = await this.userModel.findOne({ username: username });
      if (user.visiblity === 'public') {
        return user;
      } else {
        const isFollowing = await this.userModel.findOne({
          username: accessToken.username,
          followings: user, //{ userId: user._id },
        });
        if (isFollowing !== null || accessToken.username === username) {
          return user;
        }
        console.log('need accessToken');
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
            { $push: { followers: wantedFollow } },
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
                  userId: me.username,
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

  async followAccept(followName: string, username: string) {
    try {
      const wantedFollow = await this.userModel.findOne({
        username: followName,
      });
      return await this.userModel.updateOne(
        { username: username, followers: wantedFollow },
        {
          followers: {
            status: 'accepted',
          },
        },
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async followReject(followName: string, username: string) {
    try {
      const wantedFollow = await this.userModel.findOne({
        username: followName,
      });
      return await this.userModel.updateOne(
        { username: username, followers: wantedFollow },
        {
          $pop: {
            followers: wantedFollow,
          },
        },
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  remove(username: string) {
    return this.userModel.remove({ username: username }).exec();
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
