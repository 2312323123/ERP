import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtDecode } from 'src/app.service';
import { Token } from 'src/tokens/entities/token.entity';
import { TokensService } from 'src/tokens/tokens.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class JwtIssuerService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
  ) {}

  // issue jwt token with id, roles (and exp)
  // return jwt token and refresh token in response body
  async login(id: string) {
    const userRoles = await this.usersService.getUserRolesById(id);
    const userRolesWithoutDescriptions = userRoles.map((role) => role.role);

    const payload = {
      id,
      roles: userRolesWithoutDescriptions,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    // wonder if its expiration could be not checked when refreshing, what would it result in?
    const refreshToken = this.jwtService.sign({ id }, { expiresIn: '3d' }); // Refresh token with longer expiration

    // save refresh token in db
    await this.addNewErpRefreshToken(id, refreshToken);

    return {
      accountExists: true,
      accessToken,
      refreshToken,
    };
  }

  async addNewErpRefreshToken(id: string, token: string): Promise<void> {
    const exp = jwtDecode(token).exp;

    // Retrieve the tokens entry from the database
    const tokens = await this.tokensService.findOne(id);
    if (!tokens) {
      throw new Error('Tokens entry not found 943r9ur');
    }

    // Remove expired tokens
    this.removeExpiredErpRefreshTokens(tokens.in_app_refresh_tokens);

    // Add new token
    tokens.in_app_refresh_tokens = {
      ...tokens.in_app_refresh_tokens,
      [token]: exp,
    };

    // Save the updated user back to the database
    await this.tokenRepository.save(tokens);
  }

  private removeExpiredErpRefreshTokens(in_app_refresh_tokens: Record<string, number> | null): void {
    if (!in_app_refresh_tokens) {
      return;
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    Object.keys(in_app_refresh_tokens).forEach((token) => {
      const expiry = in_app_refresh_tokens[token];
      if (expiry < currentTime) {
        delete in_app_refresh_tokens[token]; // Remove expired token
      }
    });
  }
}
