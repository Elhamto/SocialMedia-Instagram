import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { Post, PostDocument } from './schema/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    private readonly userService: UserService,
  ) {}

  create(createPostDto: CreatePostDto) {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async remove(id, req) {
    const post = await this.postModel.findById(id);
    if (post.owner == req.userId) {
      return this.postModel.remove({ _id: id }).exec();
    }
    return ForbiddenException;
  }

  getAllForExplorer() {
    return this.postModel.find().exec();
  }

  getPostByUrl(postId) {
    return this.postModel.findOne({ _id: postId }).exec();
  }

  async getAllForUser(username: string, req): Promise<Post[] | any> {
    if (req.username == username) {
      return this.postModel.find({ owner: req.userId }).exec();
    }
    const user = await this.userService.getUserData(username);
    if (user.visiblity === 'public') {
      return this.postModel.find({ owner: user }).exec();
    }
    // if (my.following include user) {
    //   return this.postModel.find({ owner: user }).exec();
    // }
    return ForbiddenException;
  }

  async update(postId: string, updatePostDto: UpdatePostDto, req) {
    const post = await this.postModel.findById(postId);
    if (req.userId == post.owner) {
      return this.postModel.updateOne(
        { _id: postId },
        {
          caption: updatePostDto.caption,
          content: updatePostDto.content,
          comments: updatePostDto.comments, // writer comment bayad moshakhas beshe
          likes: updatePostDto.likes, // like khodamo // mitunim like kardan ro joda konim
        },
      );
    }
  }

  likePost(postId, user) {
    this.postModel.findByIdAndUpdate(postId, { $push: { likes: user.userId } });
  }
  addComment(postId: string, updatePostDto: UpdatePostDto, req) {
    // const user = await this.userService.getUserData(req.username);
    return this.postModel.updateOne(
      { _id: postId },
      {
        $push: {
          comments: {
            writer: req.userId, // user
            commentContent: updatePostDto.comments,
            date: Date.now(),
          },
        },
      },
    );
    // reply
  }

  async delComments(postId: string, updatePostDto: UpdatePostDto, req) {
    const post = await this.postModel.findById(postId);
    if (req.userId == post.owner /* req.userId == post.comments.$.writer  */) {
      return this.postModel.updateOne(
        { _id: postId },
        {
          $pull: {
            comments: updatePostDto.comments,
            // comments: {
            //   _id: updatePostDto.comments,
            // }
          },
        },
      );
    }
  }
}
