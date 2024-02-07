import { Module } from '@nestjs/common';

import { SettingsService } from './service/settings.service';

@Module({
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SharedModule {}
