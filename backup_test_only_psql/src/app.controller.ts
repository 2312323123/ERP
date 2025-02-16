import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { TestEntity } from './postgres/test.entity';

class MessageDto {
  message: string;
}

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('messages/postgres')
  writeToPostgres(@Body() dto: MessageDto): Promise<TestEntity> {
    return this.appService.writeToPostgres(dto.message);
  }

  @Get('messages/postgres')
  readFromPostgres(): Promise<TestEntity[]> {
    return this.appService.readFromPostgres();
  }

  @Delete('messages/postgres')
  clearPostgres(): Promise<void> {
    return this.appService.clearPostgres();
  }
}
