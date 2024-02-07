import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterUserDto } from './auth.types';
import { LocalAuthGuard } from '../../common/guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterUserDto) {
    await this.authService.register(registrationData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Body() loginData: RegisterUserDto) {
    return this.authService.login(loginData.username, loginData.password);
  }
}
