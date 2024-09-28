import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryColumn() // This will be the primary key and foreign key
  id: string; // Adjust type based on User ID type (e.g., string, number)

  @OneToOne(() => User, (user) => user.tokens)
  @JoinColumn({ name: 'id' }) // user tokens
  user: User;

  @Column({ nullable: true })
  google_access_token: string;

  @Column({ nullable: true })
  google_refresh_token: string;

  @Column({ nullable: true, type: 'timestamptz' })
  google_tokens_expiry: Date;

  @Column('hstore', { nullable: true })
  in_app_refresh_tokens: Record<string, number>;
}
