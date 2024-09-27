import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { UsersService } from './users/users.service';

export class InvalidTokenError extends Error {}

InvalidTokenError.prototype.name = 'InvalidTokenError';

function b64DecodeUnicode(str: string) {
  return decodeURIComponent(
    atob(str).replace(/(.)/g, (m, p) => {
      let code = p.charCodeAt(0).toString(16).toUpperCase();

      if (code.length < 2) {
        code = '0' + code;
      }

      return '%' + code;
    }),
  );
}

function base64UrlDecode(str: string) {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');

  switch (output.length % 4) {
    case 0:
      break;

    case 2:
      output += '==';

      break;

    case 3:
      output += '=';

      break;

    default:
      throw new Error('base64 string is not of the correct length');
  }

  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}

function jwtDecode(token: string, options: { header?: boolean } = {}) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified: must be a string');
  }

  const pos = options.header === true ? 0 : 1;

  const part = token.split('.')[pos];

  if (typeof part !== 'string') {
    throw new InvalidTokenError(
      `Invalid token specified: missing part #${pos + 1}`,
    );
  }

  let decoded;

  try {
    decoded = base64UrlDecode(part);
  } catch (e) {
    throw new InvalidTokenError(
      `Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`,
    );
  }

  try {
    return JSON.parse(decoded);
  } catch (e) {
    throw new InvalidTokenError(
      `Invalid token specified: invalid json for part #${pos + 1} (${e.message})`,
    );
  }
}

function extractBearerToken(authHeader: string) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('No Bearer token found');
  }

  const token = authHeader.split(' ')[1]; // Extract the token part
  // You can now use the token for further processing, like verifying it
  return token;
}
@Injectable()
export class AppService {
  private oAuth2Client = new OAuth2Client(
    process.env.AUTH_GOOGLE_CLIENT_ID,
    process.env.AUTH_GOOGLE_CLIENT_SECRET,
    'postmessage',
  );

  constructor(private usersService: UsersService) {}

  getHello(): string {
    return 'Hello World auth!';
  }

  decodeToken(token: string) {
    return jwtDecode(token);
  }

  extractBearerToken(header: string) {
    return extractBearerToken(header);
  }

  async login(authHeader: string) {
    const code = this.extractBearerToken(authHeader);

    const { tokens }: { tokens: Credentials } =
      await this.oAuth2Client.getToken(code); // exchange code for tokens

    // check if user exists in db
    let userExists;
    if (tokens.id_token) {
      const google_id = this.decodeToken(tokens.id_token).sub;
      try {
        await this.usersService.findOne(google_id);
        userExists = true;
      } catch (error) {
        if (error instanceof NotFoundException) {
          userExists = false;
        } else {
          throw new HttpException(
            'Error fetching user from db',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }

    if (userExists) {
      // decode and update user info from access token
      // store google api token and google refresh token in db
      // issue jwt token with roles (and exp)
      // return jwt token and refresh token in response body
      // return tokens;
      return 'dupa9842u34893';
    }

    // user doesn't exist
    // return some appropriate error and id_token
    throw new NotFoundException({
      error: "User doesn't exist yet",
      id_token: tokens.id_token,
    });
  }
}
