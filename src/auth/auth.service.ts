import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //   async validateUser(id: string, pass: string): Promise<any> {
  //     const user = await this.userService.findOne(id);
  //     if (user && user.password === pass) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //     return null;
  //   }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUser(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    user._doc ? (user = user._doc) : user;
    const payload = { username: user.username, userId: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
