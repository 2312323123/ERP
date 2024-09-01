import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Redirect,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  @Header('Cache-Control', 'none')
  @HttpCode(204)
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('hehe')
  @Redirect('http://www.duckduckgo.com', 301)
  heheRedirect(): void {}
}
