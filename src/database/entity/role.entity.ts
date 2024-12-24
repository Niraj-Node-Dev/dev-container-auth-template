import {
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Base } from './base';
import { RoleAvailableEntity, UserEntity } from './index';

@Entity('role')
export class RoleEntity extends Base {
  @ManyToOne(() => UserEntity, (user) => user.id, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  @JoinTable()
  user!: UserEntity;

  @ManyToOne(() => RoleAvailableEntity, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role!: RoleAvailableEntity;

  @DeleteDateColumn({ type: 'timestamptz', default: null })
  deleted_at!: Date | null;
}
