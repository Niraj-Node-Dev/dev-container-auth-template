import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { validateJwt } from '../index';
import { JwtPayload } from 'jsonwebtoken';

export enum AvailableRoleEnum {
    ADMIN = 'ADMIN',
    GUEST = 'GUEST',
    NORMAL = 'NORMAL',
}

export interface CustomRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

export interface UserPayload extends JwtPayload {
    id: string;
    email: string;
    role: AvailableRoleEnum;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor() { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        if (!request.headers['authorization']) {
            throw new UnauthorizedException({
                is_error: true,
                message: 'Unauthorization',
            });
        }

        const token: string = request.headers['authorization'] as string;
        if (token) {
            return this.bearerValidation(token, request);
        }

        return false;
    }

    private async bearerValidation(token: string, request: Request) {
        if (!token) {
            throw new UnauthorizedException({
                is_error: true,
                message: 'authorization failed',
            });
        }

        validateJwt(token, request);
        return true;
    }
}
