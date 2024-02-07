import { Body, Controller, Put, Request, UseGuards } from '@nestjs/common';

import { UserFavoriteService } from './user-favorite.service';
import { SaveFavoriteDto } from './user-favorite.types';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class UserFavoriteController {
  constructor(private readonly userFavoriteService: UserFavoriteService) {}

  @Put('team')
  async register(
    @Request() request: any,
    @Body() saveFavoriteData: SaveFavoriteDto,
  ): Promise<boolean> {
    const { teamId } = saveFavoriteData;

    return await this.userFavoriteService.saveFavorite(request.user.id, teamId);
  }
}
