import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
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

  // used by login() and refresh()
  async issueNewAccessToken(id: string) {
    const userRoles = await this.usersService.getUserRolesById(id);
    const userRolesWithoutDescriptions = userRoles.map((role) => role.role);

    const payload = {
      id,
      roles: userRolesWithoutDescriptions,
    };

    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  // issue jwt token with id, roles (and exp)
  // return jwt token and refresh token in response body
  async login(id: string) {
    const accessToken = await this.issueNewAccessToken(id);
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
    const { exp } = this.jwtService.decode(token);

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

  async removeRefreshToken(token: string): Promise<void> {
    const { id } = this.jwtService.decode(token);

    const tokens = await this.tokensService.findOne(id);
    if (!tokens) {
      throw new NotFoundException('Tokens entry not found 434r43r2');
    }

    const { in_app_refresh_tokens } = tokens;

    // Check if the token exists
    if (!in_app_refresh_tokens || !in_app_refresh_tokens[token]) {
      throw new NotFoundException('Token not found yui8644e3');
    }

    // Remove the token
    delete in_app_refresh_tokens[token];

    // Save the updated tokens back to the database
    await this.tokensService.updateRefreshTokens(id, in_app_refresh_tokens);
  }

  async refresh(refreshToken: string) {
    try {
      // Simply verify the token
      this.jwtService.verify(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid JWT token');
    }

    const { id } = this.jwtService.decode(refreshToken);

    const tokens = await this.tokensService.findOne(id);
    if (!tokens) {
      throw new NotFoundException('Tokens entry not found 5r3542');
    }

    const { in_app_refresh_tokens } = tokens;

    // Check if the token exists
    if (!in_app_refresh_tokens || !in_app_refresh_tokens[refreshToken]) {
      throw new NotFoundException('Token not found 23r56yy7');
    }

    // Check if the token has expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (in_app_refresh_tokens[refreshToken] < currentTime) {
      throw new UnauthorizedException('Token has expired 3de4fw4');
    }

    // Issue new access token
    const accessToken = await this.issueNewAccessToken(id);

    return {
      access_token: accessToken,
    };
  }
}
