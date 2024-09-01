import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(
      '630669205687-0ehpf5m5mav31shhe4kuviler3n9lr98.apps.googleusercontent.com',
    );
  }

  checkIfHeaderCorrect(authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    // Extract token from the 'Authorization' header
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    return token;
  }

  isSystemMember(userData: any) {
    return userData.sub === '105887563550899714086';
  }

  async verifyGoogleToken(token: string): Promise<any> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });

      const payload = ticket.getPayload();
      return payload;
    } catch {
      throw new BadRequestException('Invalid Google token');
    }
  }

  async checkAuthorisedToEnterSystem(userData: any) {
    // Here you would typically handle user authentication/registration logic

    return {
      isMember: this.isSystemMember(userData),
      roles: ['DUPA1', 'DUPA2', 'DUPA3'],
    };
  }
}
