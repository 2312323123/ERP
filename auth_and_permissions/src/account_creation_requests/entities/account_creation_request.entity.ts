import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AccountCreationRequest {
  // aud - audience - we have one specific - check, don't store

  // email
  @Column()
  email: string;

  // email_verified
  @Column()
  email_verified: boolean;

  // family_name
  @Column()
  family_name: string;

  // given_name
  @Column()
  given_name: string;

  // hd - hosted domain - we have one specific - check, don't store

  // jti - JWT ID - may be used to invalidate token on logout somewhere later on

  // name
  @Column()
  name: string;

  // picture
  @Column()
  picture: string;

  // sub goes here - subject - unique identifier for user
  @PrimaryColumn({ unique: true })
  id: string;
}
