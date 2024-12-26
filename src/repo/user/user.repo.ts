import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../database/entity';
import { AppDataSource } from '../../database/connection';

export class UserError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class UserAvaialbleError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class UserRepositoryError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    protected connection = AppDataSource;
    constructor(protected dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }
}
