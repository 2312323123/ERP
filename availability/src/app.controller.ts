import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles('USER, SUPERADMIN')
  @Get('/api/availability')
  getHello(): string {
    return this.appService.getHello();
  }

  /*
  @Post('/api/auth/setup-roles')
  async setupRoles(@Body() { role, description = '' }: { role: string; description: string }) {
    const createRoleDto = new CreateRoleDto(role, description);

    return await this.rolesService.create(createRoleDto);
  }
got replaced by this:

  @Post('/api/auth/setup-roles')
  async setupRoles(
    @Body('role', UndefinedCheckPipe) role: string,
    @Body() { description = '' }: { description: string },
  ) {
    const createRoleDto = new CreateRoleDto(role, description);

    return await this.rolesService.create(createRoleDto);
  }
*/

  // async getSmth(@UserId() userId: string) {}
}
