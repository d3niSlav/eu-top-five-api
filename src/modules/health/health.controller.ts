import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { PingIndicator } from './indicator/ping.indicator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private ormIndicator: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private ping: PingIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.ormIndicator.pingCheck('database', { timeout: 15000 }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_RSS', 300 * 1024 * 1024),
      () => this.ping.isHealthy('nestjs-docs', 'https://www.naver.com'),
    ]);
  }
}
