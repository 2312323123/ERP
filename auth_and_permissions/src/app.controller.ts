import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AccountDecisionDto, AppService } from './app.service';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { CreateRoleDto } from './roles/dto/create-role.dto';
import { RolesService } from './roles/roles.service';

@Controller()
export class AppController {
  private oAuth2Client = new OAuth2Client(
    process.env.AUTH_GOOGLE_CLIENT_ID,
    process.env.AUTH_GOOGLE_CLIENT_SECRET,
    'postmessage',
  );

  constructor(
    private readonly appService: AppService,
    private readonly rolesService: RolesService,
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

  @Post('/api/auth/login')
  async login(@Body() { code }: { code: string }) {
    const { tokens }: { tokens: Credentials } = await this.oAuth2Client.getToken(code); // exchange code for tokens
    // jwtDecode(tokens.id_token); // decode the id_token
    return tokens;
    // if (tokens.id_token) {
    //   return this.appService.decodeToken(tokens.id_token);
    // } else {
    //   throw NotFoundException;
    // }
  }

  // this version gets code from bearer in header
  @Get('/api/auth/login2')
  async login2(@Headers('authorization') authHeader: string) {
    return await this.appService.login(authHeader);
    // return 'dupa';
  }

  // @Post('/api/auth/refresh')
  // async refresh(@Body() { refreshToken }: { refreshToken: string }) {
  //   try {
  //     // Set the credentials with the refresh token
  //     this.oAuth2Client.setCredentials({
  //       refresh_token: refreshToken,
  //     });

  //     // Refresh the access token
  //     const response = await this.oAuth2Client.getAccessToken();
  //     const newAccessToken = response.token;

  //     if (!newAccessToken) {
  //       throw new HttpException(
  //         'Failed to refresh tokens',
  //         HttpStatus.UNAUTHORIZED,
  //       );
  //     }

  //     // Get user info by validating the new access token
  //     const ticket = await this.oAuth2Client.verifyIdToken({
  //       idToken: newAccessToken, // Use the access token for verification
  //       audience: process.env.AUTH_GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
  //     });

  //     const payload = ticket.getPayload();
  //     const newIdToken = ticket.getIdToken(); // Get the new ID token

  //     return {
  //       accessToken: newAccessToken,
  //       idToken: newIdToken,
  //       userInfo: payload, // Contains user information like email, name, etc.
  //     };
  //   } catch (error) {
  //     console.error('Error refreshing tokens:', error);
  //     throw new HttpException(
  //       'Failed to refresh tokens',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  // }

  @Post('/api/auth/logout')
  dupa() {
    return 'dupa';
  }

  @Post('/api/auth/ask-for-account')
  async askForAccount(@Headers('authorization') authHeader: string) {
    // remember to verify the id_token is valid and to check domain
    return await this.appService.askForAccount(authHeader);
    // return 'dupa2';
  }

  // TODO: add guard here and everywhere else except /api/auth/setup-roles, which in turn has to be not shared to the world
  @Post('/api/auth/account-creation-decision')
  async accountCreationDecision(@Body() accountDecisionDto: AccountDecisionDto) {
    return await this.appService.accountCreationDecision(accountDecisionDto);
  }

  @Post('/api/auth/setup-roles')
  async setupRoles(@Body() { role, description = '' }: { role: string; description: string }) {
    const createRoleDto = new CreateRoleDto(role, description);

    return await this.rolesService.create(createRoleDto);
  }

  // @Post('/api/auth/verify')
  // async verify(@Body() { idToken }: { idToken: string }) {
  //   const ticket = await this.oAuth2Client.verifyIdToken({
  //     idToken,
  //     audience: process.env.AUTH_GOOGLE_CLIENT_ID,
  //   });
  //   const payload = ticket.getPayload();
  //   return payload;
  // }

  // @Post('/api/auth/refresh')

  // @Post('/api/auth/google')
  // async google(@Body() { code }: { code: string }) {
  //   const { tokens } = await this.oAuth2Client.getToken(code); // exchange code for tokens
  //   return tokens;
  // }
}
