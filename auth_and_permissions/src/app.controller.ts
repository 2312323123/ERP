import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AccountDecisionDto, AppService } from './app.service';
import { CreateRoleDto } from './roles/dto/create-role.dto';
import { RolesService } from './roles/roles.service';
import { UsersService } from './users/users.service';
import { UndefinedCheckPipe } from './pipes/undefined-check.pipe';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/api/auth')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/api/auth/dupa')
  getHello2(): string {
    return this.appService.getHello();
  }
  @Get('/api/auth/dupa2')
  async getHello3(): Promise<any> {
    return await this.makeRequest();
  }
  @Get('/api/auth/dupa3')
  async getHello4(): Promise<any> {
    return await this.usersService.getUserRolesById('105887563550899714086');
  }

  async makeRequest() {
    try {
      const response = await fetch('http://auth_and_permissions:3000/api/auth/dupa');

      // Check if the content type is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Response data:', data);
        return data;
      } else {
        // If the response is not JSON, treat it as text
        const textData = await response.text();
        console.log('Response is not JSON:', textData);
        return textData;
      }
    } catch (error) {
      console.error('Error making HTTP request hehe:', error);
    }
  }

  // this version gets code from bearer in header
  @Get('/api/auth/login')
  async login2(@Headers('authorization') authHeader: string) {
    return await this.appService.login(authHeader);
  }

  @Post('/api/auth/ask-for-account')
  async askForAccount(@Headers('authorization') authHeader: string) {
    // remember to verify the id_token is valid and to check domain
    return await this.appService.askForAccount(authHeader);
  }

  // TODO: add guard here and everywhere else except /api/auth/setup-roles, which in turn has to be not shared to the world
  @Post('/api/auth/account-creation-decision')
  async accountCreationDecision(@Body() accountDecisionDto: AccountDecisionDto) {
    return await this.appService.accountCreationDecision(accountDecisionDto);
  }
  @Post('/api/auth/account-creation-decision-maciek')
  async accountCreationDecisionMaciek() {
    return await this.appService.accountCreationDecisionMaciek();
  }

  @Post('/api/auth/setup-roles')
  async setupRoles(
    @Body('role', UndefinedCheckPipe) role: string,
    @Body() { description = '' }: { description: string },
  ) {
    const createRoleDto = new CreateRoleDto(role, description);

    return await this.rolesService.create(createRoleDto);
  }

  @Post('/api/auth/logout')
  async logout(
    @Body('id', UndefinedCheckPipe) id: string,
    @Body('refresh_token', UndefinedCheckPipe) refresh_token: string,
  ) {
    await this.appService.logout(id, refresh_token);
    return { message: 'Logged out successfully' };
  }

  @Post('/api/auth/refresh')
  async refresh(
    @Body('id', UndefinedCheckPipe) id: string,
    @Body('refresh_token', UndefinedCheckPipe) refresh_token: string,
  ) {
    return await this.appService.refresh(id, refresh_token);
  }

  // role panel purposes
  @Post('/api/auth/give-role')
  async giveRole(@Body('id', UndefinedCheckPipe) id: string, @Body('role', UndefinedCheckPipe) role: string) {
    return await this.appService.giveRole(id, role);
  }
  // anyone can give dwaciek superadmin
  @Post('/api/auth/give-dwaciek-superadmin')
  async giveDwaciekSuperadmin() {
    return await this.appService.giveRole('105887563550899714086', 'SUPERADMIN');
  }
  // TODO: only superadmin can take away dwaciek superadmin
  @Post('/api/auth/take-away-dwaciek-superadmin')
  async takeAwayDwaciekSuperadmin() {
    return await this.appService.takeAwayRole('105887563550899714086', 'SUPERADMIN');
  }

  // role panel purposes
  @Post('/api/auth/take-away-role')
  async takeAwayRole(@Body('id', UndefinedCheckPipe) id: string, @Body('role', UndefinedCheckPipe) role: string) {
    return await this.appService.takeAwayRole(id, role);
  }

  // role panel purposes
  @Get('/api/auth/get-all-roles')
  async getAllRoles() {
    return await this.appService.getAllRoles();
  }

  // role panel purposes
  @Get('/api/auth/get-users-with-their-roles')
  async getUsersWithTheirRoles() {
    return await this.appService.getUsersWithTheirRoles();
  }

  // role panel purposes
  @Get('/api/auth/get-account-creation-requests')
  async getAccountCreationRequests() {
    return await this.appService.getAccountCreationRequests();
  }
}
