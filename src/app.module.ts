import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/connection';
import { RealTimeGateway } from './real-time/real-time.gateway';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { redis } from './utils/redis';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { THROTTLE_LIMIT, THROTTLE_TTL } from './config';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      storage: new ThrottlerStorageRedisService(redis),
      throttlers: [
        {
          ttl: THROTTLE_TTL,
          limit: THROTTLE_LIMIT,
        },
      ],
    }),
    TypeOrmModule.forRootAsync({ useFactory: () => ormConfig }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RealTimeGateway,
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },

  ],
})
export class AppModule { }
