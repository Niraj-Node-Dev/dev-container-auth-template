import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleAvailableEntity } from '../../database/entity';
import { AppDataSource } from '../../database/connection';

export class RoleAvaialbleError extends Error {
    constructor(message: string) {
        super(message);
    }
}

@Injectable()
export class RoleAvailableRepository extends Repository<RoleAvailableEntity> {
    protected connection = AppDataSource;
    constructor(protected dataSource: DataSource) {
        super(RoleAvailableEntity, dataSource.createEntityManager());
    }
}
