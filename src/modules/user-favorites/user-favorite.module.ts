import { Module } from '@nestjs/common';

import { UserFavoriteController } from './user-favorite.controller';
import { UserFavoriteRepository } from './user-favorite.repository';
import { UserFavoriteService } from './user-favorite.service';
import { TypeOrmExModule } from '../../common/module/typeorm.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserFavoriteRepository])],
  providers: [UserFavoriteService],
  exports: [UserFavoriteService],
  controllers: [UserFavoriteController],
})
export class UserFavoriteModule {}
