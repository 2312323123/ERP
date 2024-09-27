import { AccountCreationRequest } from 'src/account_creation_requests/entities/account_creation_request.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends AccountCreationRequest {
  // sub goes here - subject - unique identifier for user
  @PrimaryColumn()
  id: string;

  // user roles
  @ManyToMany(() => Role, (role) => role.role)
  @JoinTable()
  roles: Role[];
}
