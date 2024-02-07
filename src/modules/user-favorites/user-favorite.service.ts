import { Injectable } from '@nestjs/common';

import { UserFavoriteRepository } from './user-favorite.repository';

@Injectable()
export class UserFavoriteService {
  constructor(
    private readonly userFavoriteRepository: UserFavoriteRepository,
  ) {}

  async saveFavorite(userId: string, teamId: string): Promise<boolean> {
    const favoriteRecord = await this.userFavoriteRepository.findOneBy({
      userId,
      teamId,
    });

    if (favoriteRecord) {
      await this.userFavoriteRepository.delete(favoriteRecord);
    } else {
      await this.userFavoriteRepository.save({ userId, teamId });
    }

    return true;
  }
}
