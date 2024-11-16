import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Roles('SUPERADMIN')
  @Roles()
  @Get('/api/interviews')
  getHello(): string {
    return this.appService.getHello();
  }
}
