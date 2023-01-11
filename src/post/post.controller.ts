import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file'))
//   uploadFile(@UploadedFile() file: Express.Multer.File) {
//   console.log(file);
// }

  @Post() //create post
  create(@Body() createPostDto, @Request() req) {
    createPostDto.owner = req.user.userId;
    createPostDto.comments.writer = req.user.userId;
    return this.postService.create(createPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.postService.remove(id, req.user);
  }

  @Get() //Explorer behtare ye filteri barash bezaram // ye limiti
  getAllForExplorer() {
    return this.postService.getAllForExplorer();
  }

  @Get(':username')
  getAllForOneUser(@Param('username') username: string, @Request() req) {
    return this.postService.getAllForUser(username, req.user);
  }

  @Get('p/:id')
  getPostByUrl(@Param('id') id: string) {
    return this.postService.getPostByUrl(id);
  }

  @Patch(':id') // id ye post ke bayad har user ghablesh login shode bashe
  update( // like post
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req,
  ) {
    return this.postService.update(id, updatePostDto, req.user);
  }

  @Post(':id')
  addComment(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req,
  ) {
    return this.postService.addComment(id, updatePostDto, req.user);
  }

  // likeComment
}
