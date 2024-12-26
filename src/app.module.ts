import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/connection';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: () => ormConfig }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
