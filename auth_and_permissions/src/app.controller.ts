import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OAuth2Client } from 'google-auth-library';

@Controller()
export class AppController {
  private oAuth2Client = new OAuth2Client(
    process.env.AUTH_GOOGLE_CLIENT_ID,
    process.env.AUTH_GOOGLE_CLIENT_SECRET,
    'postmessage',
  );

  constructor(private readonly appService: AppService) {}

  @Get('/api/auth')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/api/auth/google')
  async google(@Body() { code }: { code: string }) {
    const { tokens } = await this.oAuth2Client.getToken(code); // exchange code for tokens
    return tokens;
  }
}
