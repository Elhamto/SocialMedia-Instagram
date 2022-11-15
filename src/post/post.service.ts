import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { Post, PostDocument } from './schema/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  findAllForExplorer() {
    return this.postModel.find().exec();
  }

  findAllForOneUser(owner: ObjectId): Promise<Post[]> {
    return this.postModel.find({ owner: owner }).exec();
  }

  findOne(id: number) {
    return this.postModel.findById(id).exec();
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.updateOne(
      { _id: id },
      {
        caption: updatePostDto.caption,
        content: updatePostDto.content,
      },
    );
    // return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
