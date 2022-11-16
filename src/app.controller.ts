import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  // async login(@Request() req): Promise<User | { accessToken: string }> {
  //   // return request.user;
  //   return await this.authService.login(req.user);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('secret')
  getProfile(@Request() req) {
    // return req.user;
    return `hello ${JSON.stringify(req.user)}`;
  }
}
