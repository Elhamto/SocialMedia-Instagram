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
  editProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.editProfile(req.user, updateUserDto);
  }

  @Get('follow')
  getUserFollowers(@Request() req) {
    //send reguest
    return this.userService.getUserFollowers(req.user);
  }

  @Post('follow')
  followUser(@Body() body, @Request() req) {
    //send reguest
    return this.userService.follow(body, req.user);
  }

  @Delete('follow')
  unfollowUser(@Body() body, @Request() req) {
    //send reguest
    return this.userService.unfollow(body, req.user);
  }

  @Patch('follow')
  manageFollowRequests(@Body() body, @Request() req) {
    return this.userService.manageFollowRequests(body, req.user);
  }

  @Get(':username')
  getUserData(@Param('username') username: string, @Request() req?) {
    return this.userService.getUserData(username, req.user);
  }

  @Delete()
  remove(@Request() req) {
    return this.userService.remove(req.user);
  }

  @Post('block/:username')
  blockUser(@Param('username') username: string, @Request() req) {
    return this.userService.blockUser(username, req.user.username);
  }

  @Delete('block/:username')
  unblockUser(@Param('username') username: string, @Request() req) {
    return this.userService.unblockUser(username, req.user.username);
  }

  @Post('close/:username')
  addCloseUser(@Param('username') username: string, @Request() req) {
    return this.userService.addCloseFriend(username, req.user.username);
  }

  @Delete('block/:username')
  delCloseUser(@Param('username') username: string, @Request() req) {
    return this.userService.delCloseFriend(username, req.user.username);
  }

  @Post('hide/:username')
  hideUser(@Param('username') username: string, @Request() req) {
    return this.userService.hideUser(username, req.user.username);
  }

  @Delete('block/:username')
  unhideUser(@Param('username') username: string, @Request() req) {
    return this.userService.unhideUser(username, req.user.username);
  }

  // @Get('followRequests/:username')
  // showFollowRequests(@Param('username') username: string) {
  //   return this.userService.showFollowRequests(username)
  // }

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

  // @Post(':username')
  // acceptFollower(@Body() follow, @Param('username') username) {
  //   return this.userService.addFollower(follow.follow, username);
  // }
}
