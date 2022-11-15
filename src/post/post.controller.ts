import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { ObjectId } from 'mongoose';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post() //create post
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get() //Explorer behtare ye filteri barash bezaram
  findAllForExplorer() {
    return this.postService.findAllForExplorer();
  }

  @Get(':id') //mikham begam id nade va login base bashe
  findAllForOneUser(@Param('id') id: ObjectId) {
    return this.postService.findAllForOneUser(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postService.findOne(+id);
  // }

  @Patch(':id') // id ye post ke bayad har user ghablesh login shode bashe
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
