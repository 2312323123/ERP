import { AccountCreationRequest } from 'src/account_creation_requests/entities/account_creation_request.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Token } from 'src/tokens/entities/token.entity';
import { CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends AccountCreationRequest {
  // // sub goes here - subject - unique identifier for user
  // @PrimaryColumn()
  // id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  // user roles
  @ManyToMany(() => Role, (role) => role.role)
  @JoinTable()
  roles: Role[];

  // user tokens
  @OneToOne(() => Token, (token) => token.user, { cascade: true })
  // @JoinColumn({ name: 'id' })
  tokens: Token;
}
