import { Column, DeleteDateColumn, Entity, Index, OneToMany } from 'typeorm';
import { Base } from './base';
import { RoleEntity } from './index';

@Entity('users')
export class UserEntity extends Base {
  @Index('IDX_UQ_user_email', { unique: true })
  @Column({ type: 'varchar', length: 300 })
  email!: string;

  @Column({ type: 'varchar', length: 300 })
  first_name!: string;

  @Column({ type: 'varchar', length: 300, default: null })
  last_name!: string | null;

  @Column({ type: 'varchar', length: 300, default: null, nullable: true })
  salt!: string;

  @Column({ type: 'varchar', length: 300, default: null, nullable: true })
  password_hash!: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  access_token?: string | null;

  @DeleteDateColumn({ type: 'timestamptz', default: null })
  deleted_at!: Date | null;

  @OneToMany(() => RoleEntity, (role) => role.user)
  role!: RoleEntity[];
}
