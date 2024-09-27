import { CreateUserDto } from 'src/users/dto/create-user.dto';

// it is supposed to have the same fields as CreateUserDto
export class CreateAccountCreationRequestDto extends CreateUserDto {
  constructor(
    email: string,
    email_verified: boolean,
    family_name: string,
    given_name: string,
    name: string,
    picture: string,
    id: string,
  ) {
    super(email, email_verified, family_name, given_name, name, picture, id);
  }
}
