import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ConflictException,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UnautherizationError } from '../error/unauthorization.error';
import correlator from 'express-correlation-id';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

export type TUnprocessableEntityException = UnprocessableEntityException & { data: any };

export declare type ClassConstructor<T> = {
    new(...args: any[]): T;
};

export class ExceptionDto<T = unknown> {
    @ApiProperty()
    is_error!: boolean;

    @ApiProperty()
    message!: string;

    @ApiProperty()
    correlator_id!: string;

    @ApiProperty()
    data!: T;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    /**
     * It will use as a global catcher for the whole project.
     * @param exception unknown
     * @param host ArgumentsHost
     */

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let message = exception.message ?? 'Unknown error';
        let code = 'HttpException';

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let data = {};

        const ignorePath: string[] = ['/favicon.ico'];

        switch (exception.constructor) {
            case UnautherizationError:
                status = (exception as UnautherizationError).getStatus();
                message = (exception as UnautherizationError).message;
                code = (exception as any).code;
                break;
            case HttpException:
                status = (exception as HttpException).getStatus();
                break;
            case BadRequestException:
                status = HttpStatus.BAD_REQUEST;
                message = (exception as BadRequestException).message;
                code = (exception as any).code;
                break;
            case Error:
                status = HttpStatus.BAD_REQUEST;
                message = exception.message;
                code = (exception as any).code;
                break;
            case UnauthorizedException:
                status = HttpStatus.UNAUTHORIZED;
                message = (exception as UnauthorizedException).message;
                code = (exception as any).code;
                break;
            case NotFoundException:
                status = HttpStatus.NOT_FOUND;
                message = (exception as NotFoundException).message;
                code = (exception as any).code;
                break;
            case TypeError:
                status = HttpStatus.CONFLICT;
                message = (exception as TypeError).message;
                code = (exception as any).code;
                break;
            case ConflictException:
                status = HttpStatus.CONFLICT;
                message = (exception as ConflictException).message;
                code = (exception as any).code;
                break;
            case UnprocessableEntityException:
                status = HttpStatus.UNPROCESSABLE_ENTITY;
                message = (exception as TUnprocessableEntityException).message;
                code = (exception as any).code;
                data = (exception as TUnprocessableEntityException)?.data || {};
                break;
        }

        if (!ignorePath.includes(request.url)) {
            console.error(
                JSON.stringify({
                    statusCode: status,
                    message,
                    code,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    method: request.method,
                    exception_stack: exception.stack,
                }),
            );
        }

        response.status(status).json(
            plainToInstance(ExceptionDto, {
                is_error: true,
                message: message,
                correlator_id: correlator.getId(),
                data: data,
            }),
        );
    }
}
