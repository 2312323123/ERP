export class CreateRoleDto {
  role: string;
  description: string;

  constructor(role: string, description: string = '') {
    this.role = role;
    this.description = description;
  }
}
