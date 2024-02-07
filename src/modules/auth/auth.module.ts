import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SettingsService } from '../shared/service/settings.service';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../../common/strategy/jwt.strategy';
import { LocalStrategy } from '../../common/strategy/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      inject: [SettingsService],
      useFactory: (settingService: SettingsService) =>
        settingService.jwtUseFactory,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
