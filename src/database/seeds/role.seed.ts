import { RoleAvailableEntity } from '../entity';
import { Seed } from './seed';

const availableRole: Pick<RoleAvailableEntity, 'name' | 'description'>[] = [
  {
    name: 'ADMIN',
    description: 'Root user',
  },
  {
    name: 'GUEST',
    description: 'Guest user',
  },
  {
    name: 'NORMAL',
    description: 'everyone user',
  },
];

class RoleSeed extends Seed {
  constructor() {
    super();
  }

  async execute() {
    await this.init();
    const manager = this.dataSource.manager.getRepository(RoleAvailableEntity);
    const data = await manager.upsert(availableRole, {
      conflictPaths: ['name'],
      skipUpdateIfNoValuesChanged: true,
    });
    return data;
  }
}

export default new RoleSeed();
