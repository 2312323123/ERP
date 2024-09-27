import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { UsersService } from './users/users.service';
import { AccountCreationRequestsService } from './account_creation_requests/account_creation_requests.service';
import { CreateAccountCreationRequestDto } from './account_creation_requests/dto/create-account_creation_request.dto';

export class AccountDecisionDto {
  action: 'accept' | 'reject';
  id: string;
}

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
    throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
  }

  let decoded;

  try {
    decoded = base64UrlDecode(part);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
  }

  try {
    return JSON.parse(decoded);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
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

  constructor(
    private usersService: UsersService,
    private accountCreationRequestsService: AccountCreationRequestsService,
  ) {}

  getHello(): string {
    return 'Hello World auth!';
  }

  async checkIfExists(crudService: any, id: string): Promise<boolean> {
    if (!id) {
      return false;
    }
    try {
      const result = await crudService.findOne(id);
      return Boolean(result);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return false;
      } else {
        throw new HttpException('Error fetching entity from db 4r3r5t', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  decodeToken(token: string) {
    return jwtDecode(token);
  }

  extractBearerToken(header: string) {
    return extractBearerToken(header);
  }

  async login(authHeader: string) {
    const code = this.extractBearerToken(authHeader);

    const { tokens }: { tokens: Credentials } = await this.oAuth2Client.getToken(code); // exchange code for tokens

    if (!tokens.id_token) {
      throw new HttpException('No id_token in response from Google u53i97', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const id = this.decodeToken(tokens.id_token).sub;

    // check if user exists in db
    let userExists;
    try {
      userExists = await this.checkIfExists(this.usersService, id);
    } catch {
      throw new HttpException('Error fetching user from db f56464', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (userExists) {
      // decode and update user info from access token
      // store google api token and google refresh token in db
      // issue jwt token with roles (and exp)
      // return jwt token and refresh token in response body
      // return tokens;
      return 'dupa9842u34893';
    }

    // check if account creation request exists - if does, serve different error than when not
    let accountCreationRequestExists;
    try {
      accountCreationRequestExists = await this.checkIfExists(this.accountCreationRequestsService, id);
    } catch {
      throw new HttpException('Error fetching AccountCreationRequest from db f56464', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (accountCreationRequestExists) {
      // request exists
      throw new HttpException('Account creation request exists 5f44t6', HttpStatus.CONFLICT);
    }

    // user doesn't exist
    // return some appropriate error and id_token
    throw new NotFoundException({
      error: "User doesn't exist yet",
      id_token: tokens.id_token,
    });
  }

  async askForAccount(authHeader: string) {
    // verify the id_token
    const id_token = this.extractBearerToken(authHeader);

    // use google library verifyIdToken method
    let ticket;
    try {
      ticket = await this.oAuth2Client.verifyIdToken({
        idToken: id_token,
        audience: process.env.AUTH_GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      console.error('Error verifying id_token:', error);
      throw new HttpException('Failed to verify id_token, 4r8w9ru', HttpStatus.UNAUTHORIZED);
    }

    const payload = ticket.getPayload();

    // check domain
    if (payload?.hd !== process.env.AUTH_GOOGLE_ORGANIZATION_DOMAIN) {
      throw new HttpException(
        "You're not using organization domain, please switch to different mail",
        HttpStatus.UNAUTHORIZED,
      );
    }

    let accountCreationRequestDto;
    if (
      payload?.email &&
      payload?.email_verified &&
      payload?.family_name &&
      payload?.given_name &&
      payload?.name &&
      payload?.picture &&
      payload?.sub // id in JWT nomenclature
    ) {
      accountCreationRequestDto = new CreateAccountCreationRequestDto(
        payload.email,
        payload.email_verified,
        payload.family_name,
        payload.given_name,
        payload.name,
        payload.picture,
        payload.sub, // id in JWT nomenclature
      );
    } else {
      throw new HttpException('Missing required fields in JWT payload 43r346t', HttpStatus.BAD_REQUEST);
    }

    // check if request already exists in db
    let requestExists;
    const google_id = payload.sub;
    try {
      await this.accountCreationRequestsService.findOne(google_id);
      requestExists = true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // not found = good
        requestExists = false;
      } else {
        throw new HttpException('Error fetching account creation request from db', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    if (requestExists) {
      // not good
      throw new HttpException('Account creation request already exists 9438r4ru', HttpStatus.CONFLICT);
    }

    // create accountCreationRequest in DB
    await this.accountCreationRequestsService.create(accountCreationRequestDto);

    // return some 201
    return;
  }

  async acceptAccountCreation(id: string) {
    // find account creation request
    const accountCreationRequest = await this.accountCreationRequestsService.findOne(id);

    // create user in db
    await this.usersService.create(accountCreationRequest);

    // delete account creation request
    await this.accountCreationRequestsService.remove(id);

    // return some 201
    return;
  }

  async rejectAccountCreation(id: string) {
    // delete account creation request
    await this.accountCreationRequestsService.remove(id);

    // return some 201
    return;
  }

  async accountCreationDecision(accountDecisionDto: AccountDecisionDto) {
    const { action, id } = accountDecisionDto;

    // Handle the "accept" or "reject" actions
    switch (action) {
      case 'accept':
        return await this.acceptAccountCreation(id);
      case 'reject':
        return await this.rejectAccountCreation(id);
      default:
        throw new BadRequestException('Invalid action provided 7844t4');
    }
    // remember to verify the id_token is valid and to check domain
    // return await this.appService.askForAccount(authHeader);
    // return 'dupa2';}
  }
}
