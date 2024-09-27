export class CreateUserDto {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
  id: string;

  constructor(
    email: string,
    email_verified: boolean,
    family_name: string,
    given_name: string,
    name: string,
    picture: string,
    id: string,
  ) {
    this.email = email;
    this.email_verified = email_verified;
    this.family_name = family_name;
    this.given_name = given_name;
    this.name = name;
    this.picture = picture;
    this.id = id;
  }
}
