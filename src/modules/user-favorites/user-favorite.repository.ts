import { Repository } from 'typeorm';

import { UserFavorite } from './user-favorite.entity';
import { CustomRepository } from '../../common/decorators/typeorm.decorator';

@CustomRepository(UserFavorite)
export class UserFavoriteRepository extends Repository<UserFavorite> {}
