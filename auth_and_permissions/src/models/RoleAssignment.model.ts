import {
  Column,
  Model,
  Table,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript';
import { Role } from './Role.model';

@Table({ tableName: 'role_assignments' })
export class RoleAssignment extends Model<RoleAssignment> {
  @PrimaryKey
  @ForeignKey(() => Role)
  @Column
  assigner_role_id!: number;

  @PrimaryKey
  @ForeignKey(() => Role)
  @Column
  assignee_role_id!: number;
}
