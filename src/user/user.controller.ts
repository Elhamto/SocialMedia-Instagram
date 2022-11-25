import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('edit')
  editProfile(@Body() id, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.editProfile(id, updateUserDto);
  }

  @Get(':username')
  getUserData(@Param('username') username: string, @Request() req?) {
    return this.userService.getUserData(username, req);
  }

  // @Post(':username')
  // acceptFollower(@Body() follow, @Param('username') username) {
  //   return this.userService.addFollower(follow.follow, username);
  // }

  @Post(':username')
  followUser(@Body() follow, @Param('username') username) {
    //send reguest
    return this.userService.follow(follow.follow, username);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.userService.remove(username);
  }

  // // @Get(':id')
  // // findOne(@Param('id') id: string) {
  // //   return this.userService.findOne(id);
  // // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
}
