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
import { UpdateUserDto } from './users/dto/update-user.dto';
import { TokensService } from './tokens/tokens.service';
import { UpdateTokenDto } from './tokens/dto/update-token.dto';
import { JwtIssuerService } from './jwt_issuer/jwt_issuer.service';
import { JwtService } from '@nestjs/jwt';

export class AccountDecisionDto {
  action: 'accept' | 'reject';
  id: string;
}

export class InvalidTokenError extends Error {}

InvalidTokenError.prototype.name = 'InvalidTokenError';

function extractBearerToken(authHeader: string) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('No Bearer token found');
  }

  const token = authHeader.split(' ')[1]; // Extract the token part
  // You can now use the token for further processing, like verifying it
  return token;
}

export async function checkIfExists(crudService: any, value: string, errorSufix: string = '4r3r5t'): Promise<boolean> {
  if (!value) {
    return false;
  }
  try {
    const result = await crudService.findOne(value);
    return Boolean(result);
  } catch (error) {
    if (error instanceof NotFoundException) {
      return false;
    } else {
      throw new HttpException(`Error fetching entity from db ${errorSufix}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
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
    private tokensService: TokensService,
    private jwtIssuerService: JwtIssuerService,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World auth!';
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

    // decode id_token
    const decodedIdToken = this.jwtService.decode(tokens.id_token);
    const id = decodedIdToken.sub;

    // check if user exists in db
    let userExists;
    try {
      userExists = await checkIfExists(this.usersService, id);
    } catch {
      throw new HttpException('Error fetching user from db f56464', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (userExists) {
      // update user info from access token
      const updateUserDto = new UpdateUserDto();
      updateUserDto.email = decodedIdToken.email;
      updateUserDto.email_verified = decodedIdToken.email_verified;
      updateUserDto.family_name = decodedIdToken.family_name;
      updateUserDto.given_name = decodedIdToken.given_name;
      updateUserDto.name = decodedIdToken.name;
      updateUserDto.picture = decodedIdToken.picture;
      // not updating id here as it makes no sense
      this.usersService.update(id, updateUserDto);

      // store google api token and google refresh token and their exp in db
      if (tokens.access_token && tokens.refresh_token && tokens.expiry_date) {
        const updateTokenDto = new UpdateTokenDto();
        updateTokenDto.google_access_token = tokens.access_token;
        updateTokenDto.google_refresh_token = tokens.refresh_token;
        updateTokenDto.google_tokens_expiry = new Date(tokens.expiry_date);

        this.tokensService.update(id, updateTokenDto);
      }

      // return jwt token and refresh token in response body
      return this.jwtIssuerService.login(id);
    } else {
      // check if account creation request exists and if does - appropriate error, if not - return id_token
      let accountCreationRequestExists;
      try {
        accountCreationRequestExists = await checkIfExists(this.accountCreationRequestsService, id);
      } catch {
        throw new HttpException(
          'Error fetching AccountCreationRequest from db f56464',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (accountCreationRequestExists) {
        // request exists
        throw new HttpException('Account creation request exists 5f44t6', HttpStatus.CONFLICT);
      } else {
        // user doesn't exist - return id_token
        return {
          accountExists: false,
          id_token: tokens.id_token,
        };
      }
    }
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
  }

  async logout(id: string, refreshToken: string) {
    await this.jwtIssuerService.removeRefreshToken(id, refreshToken);
  }

  async refresh(id: string, refreshToken: string) {
    return this.jwtIssuerService.refresh(id, refreshToken);
  }
}
