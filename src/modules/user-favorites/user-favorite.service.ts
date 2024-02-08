import { Injectable } from '@nestjs/common';

import { UserFavoriteRepository } from './user-favorite.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class UserFavoriteService {
  constructor(
    private readonly userFavoriteRepository: UserFavoriteRepository,
    private readonly userService: UserService,
  ) {}

  async saveFavorite(userId: string, teamId: string): Promise<string[]> {
    const favoriteRecord = await this.userFavoriteRepository.findOneBy({
      userId,
      teamId,
    });

    if (favoriteRecord) {
      await this.userFavoriteRepository.delete(favoriteRecord);
    } else {
      await this.userFavoriteRepository.save({ userId, teamId });
    }

    const user = await this.userService.getProfile(userId);
    const { favorites } = user;

    return favorites.map((teamId) => teamId);
  }
}
