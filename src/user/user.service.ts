import { Injectable } from '@nestjs/common';
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

  findAll(): Promise<User[]> {
    return this.userModel
      .find() // .find({ username: 'elham' }, { age: 1, phoneNumber: 1 })
      .exec();
  }

  findOne(id: number) {
    return this.userModel.findById(id).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  addFollower(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(
      { username: updateUserDto.username },
      { $push: { followers: id } },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
