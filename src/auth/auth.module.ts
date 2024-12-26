import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RoleAssignedRepository, RoleAvailableRepository, UserRepository } from '../repo';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        AuthService, UserRepository, RoleAvailableRepository, RoleAssignedRepository,
    ],
})
export class AuthModule { }
