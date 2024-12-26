import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../../database/entity';
import { AppDataSource } from '../../database/connection';

export class RoleAssignedError extends Error {
    constructor(message: string) {
        super(message);
    }
}

@Injectable()
export class RoleAssignedRepository extends Repository<RoleEntity> {
    protected connection = AppDataSource;
    constructor(protected dataSource: DataSource) {
        super(RoleEntity, dataSource.createEntityManager());
    }
}
