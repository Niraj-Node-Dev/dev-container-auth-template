import { Column, DeleteDateColumn, Entity, Index } from 'typeorm';
import { Base } from './base';

@Entity('role_available')
export class RoleAvailableEntity extends Base {
  @Index('IDX_user_role_available', { unique: true })
  @Column({ type: 'varchar', length: 300 })
  name!: string;

  @Column({ type: 'varchar', length: 300, default: null })
  description!: string | null;

  @DeleteDateColumn({ type: 'timestamptz', default: null })
  deleted_at!: Date | null;
}
