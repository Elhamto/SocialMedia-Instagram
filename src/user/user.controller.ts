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

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.userService.remove(username);
  }

  @Post('follow/:username')
  followUser(@Param('username') username: string, @Body() body) {
    //send reguest
    return this.userService.follow(body.follow, username);
  }

  @Patch('follow/:username')
  manageFollowRequests(@Param('username') username: string, @Body() body) {
    return this.userService.manageFollowRequests(username, body);
  }

  @Post('block/:username')
  blockUser(@Param('username') username: string, @Body() body) {
    return this.userService.blockUser(username, body);
  }

  @Delete('block/:username')
  unblockUser(@Param('username') username: string, @Body() body) {
    return this.userService.unblockUser(username, body);
  }

  @Post('close/:username')
  addCloseUser(@Param('username') username: string, @Body() body) {
    return this.userService.addCloseUser(username, body);
  }

  @Delete('block/:username')
  delCloseUser(@Param('username') username: string, @Body() body) {
    return this.userService.delCloseUser(username, body);
  }

  @Post('hide/:username')
  hideUser(@Param('username') username: string, @Body() body) {
    return this.userService.hideUser(username, body);
  }

  @Delete('block/:username')
  unhideUser(@Param('username') username: string, @Body() body) {
    return this.userService.unhideUser(username, body);
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
