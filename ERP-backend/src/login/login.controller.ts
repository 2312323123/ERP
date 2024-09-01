import { Controller, ForbiddenException, Headers, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async googleLogin(@Headers('authorization') authHeader: string) {
    // Check if header is correct
    const token = this.authService.checkIfHeaderCorrect(authHeader);

    // Verify the token using the AuthService
    const userData = await this.authService.verifyGoogleToken(token);

    // See if user is authorised to enter
    const { isMember, roles } =
      await this.authService.checkAuthorisedToEnterSystem(userData);

    if (isMember) {
      // Authorised
      return {
        message: 'User authenticated successfully and is this Maciej',
        roles,
      };
    } else {
      // Not authorised
      throw new ForbiddenException('User is not part of the system');
    }
  }

  @Post('dupa')
  async dupa(@Headers('authorization') authHeader: string) {
    // Check if header is correct
    const token = this.authService.checkIfHeaderCorrect(authHeader);

    // Verify the token using the AuthService
    const userData = await this.authService.verifyGoogleToken(token);

    return {
      message: 'still works, probably until 23:19:22',
      userData,
    };
  }
}
