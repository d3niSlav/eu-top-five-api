import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { UserProfileDto } from './user.types';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async user(@Request() request: any): Promise<UserProfileDto> {
    return await this.userService.getProfile(request.user.id);
  }
}
