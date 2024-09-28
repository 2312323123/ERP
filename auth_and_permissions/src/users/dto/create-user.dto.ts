export class CreateUserDto {
  constructor(
    public email: string,
    public email_verified: boolean,
    public family_name: string,
    public given_name: string,
    public name: string,
    public picture: string,
    public id: string,
  ) {}
}
