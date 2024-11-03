import { Body, Controller, Get, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { AccountDecisionDto, AppService } from './app.service';
import { CreateRoleDto } from './roles/dto/create-role.dto';
import { RolesService } from './roles/roles.service';
import { UsersService } from './users/users.service';
import { UndefinedCheckPipe } from './pipes/undefined-check.pipe';
import { Roles } from './auth/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appService: AppService,
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
  ) {}

  // @Get('/api/auth')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

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
  // ~ possibly done, but needs to be checked
  @Roles('SUPERADMIN')
  @Post('/api/auth/account-creation-decision')
  async accountCreationDecision(@Body() accountDecisionDto: AccountDecisionDto) {
    return await this.appService.accountCreationDecision(accountDecisionDto);
  }
  // anyone can let dwaciek in
  @Post('/api/auth/let-dwaciek-in') // to be removed, find a different way
  async accountCreationDecisionMaciek() {
    return await this.appService.accountCreationDecisionMaciek();
  }
  // anyone can give dwaciek superadmin
  @Post('/api/auth/give-dwaciek-superadmin')
  async giveDwaciekSuperadmin() {
    return await this.appService.giveRole('105887563550899714086', 'SUPERADMIN');
  }
  // only superadmin can take away dwaciek superadmin
  @Roles('SUPERADMIN')
  @Post('/api/auth/take-away-dwaciek-superadmin')
  async takeAwayDwaciekSuperadmin() {
    return await this.appService.takeAwayRole('105887563550899714086', 'SUPERADMIN');
  }

  // The endpoint we don't want to share with the world
  @Post('/api/auth/setup-roles')
  async setupRoles(
    @Body('role', UndefinedCheckPipe) role: string,
    @Body() { description = '' }: { description: string },
  ) {
    const createRoleDto = new CreateRoleDto(role, description);

    return await this.rolesService.create(createRoleDto);
  }

  // anyone can logout if they're logged in, which is checked below
  @Post('/api/auth/logout')
  async logout(@Body('refresh_token', UndefinedCheckPipe) refresh_token: string) {
    try {
      // Simply verify the token
      this.jwtService.verify(refresh_token);
    } catch {
      throw new UnauthorizedException('Invalid JWT token');
    }

    await this.appService.logout(refresh_token);
    return { message: 'Logged out successfully' };
  }

  // anyone can refresh if they have valid refreshtoken, which is checked below
  @Post('/api/auth/refresh')
  async refresh(@Body('refresh_token', UndefinedCheckPipe) refresh_token: string) {
    try {
      // Simply verify the token
      this.jwtService.verify(refresh_token);
    } catch {
      throw new UnauthorizedException('Invalid JWT token');
    }

    return await this.appService.refresh(refresh_token);
  }

  // role panel purposes
  @Roles('SUPERADMIN')
  @Post('/api/auth/give-role')
  async giveRole(@Body('id', UndefinedCheckPipe) id: string, @Body('role', UndefinedCheckPipe) role: string) {
    return await this.appService.giveRole(id, role);
  }

  // role panel purposes
  @Roles('SUPERADMIN')
  @Post('/api/auth/take-away-role')
  async takeAwayRole(@Body('id', UndefinedCheckPipe) id: string, @Body('role', UndefinedCheckPipe) role: string) {
    return await this.appService.takeAwayRole(id, role);
  }

  // role panel purposes
  @Roles('SUPERADMIN')
  @Get('/api/auth/get-all-roles')
  async getAllRoles() {
    return await this.appService.getAllRoles();
  }

  // role panel purposes
  @Roles('SUPERADMIN')
  @Get('/api/auth/get-users-with-their-roles')
  async getUsersWithTheirRoles() {
    return await this.appService.getUsersWithTheirRoles();
  }

  // role panel purposes
  @Roles('SUPERADMIN')
  @Get('/api/auth/get-account-creation-requests')
  async getAccountCreationRequests() {
    return await this.appService.getAccountCreationRequests();
  }
}
