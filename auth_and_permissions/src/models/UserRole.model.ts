import {
  Column,
  Model,
  Table,
  CreatedAt,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './User.model';
import { Role } from './Role.model';

@Table({ tableName: 'user_roles' })
export class UserRole extends Model<UserRole> {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @PrimaryKey
  @ForeignKey(() => Role)
  @Column
  role_id!: number;

  @CreatedAt
  @Column
  assigned_at!: Date;
}
