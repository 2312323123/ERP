import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  ordinal_number: number;

  // unique role name, also primary key, but not auto-increment

  @Column({ unique: true })
  role: string;

  // allow null for description
  @Column({ nullable: true })
  description?: string;

  // users with this role
  @ManyToMany(() => User, (user) => user.id)
  ids: User[];

  // roles this role can assign
  @ManyToMany(() => Role, (role) => role.role)
  @JoinTable({
    name: 'role_assignment_rights',
    joinColumn: { name: 'role' },
    inverseJoinColumn: { name: 'role_it_can_assign' },
  })
  roles_this_role_can_assign: Role[];

  @ManyToMany(() => Role, (role) => role.role)
  roles_this_role_can_be_assigned_by: Role[];
}
