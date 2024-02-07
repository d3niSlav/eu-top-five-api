import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { SharedModule } from './modules/shared/shared.module';
import { SettingsService } from './modules/shared/service/settings.service';
import { UserModule } from './modules/user/user.module';
import { UserFavoriteModule } from './modules/user-favorites/user-favorite.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvPath(`${__dirname}/..`),
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [SettingsService],
      useFactory: (settingService: SettingsService) =>
        settingService.typeOrmUseFactory,
    }),
    AuthModule,
    UserModule,
    UserFavoriteModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
