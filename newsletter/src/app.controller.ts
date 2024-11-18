import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/newsletter')
  getHello(): string {
    return this.appService.getHello();
  }

  @Roles('USER')
  @Get('/api/newsletter/dupa')
  getHello2(): string {
    return this.appService.getHello();
  }
}
