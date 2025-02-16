import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokensService {
  constructor(@InjectRepository(Token) private tokenRepository: Repository<Token>) {}

  create(createTokenDto: CreateTokenDto) {
    return 'This action adds a new token';
  }

  findAll() {
    return `This action returns all tokens`;
  }

  async findOne(id: string): Promise<Token> {
    const user = await this.tokenRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Tokens entry with ID ${id} not found 95t8y9r4`);
    }
    return user;
  }

  async update(id: string, updateTokenDto: UpdateTokenDto) {
    const tokens = await this.tokenRepository.findOne({ where: { id } });

    // Throw an error if the token is not found
    if (!tokens) {
      throw new NotFoundException(`Tokens entry with ID ${id} not found 34r985`);
    }

    // Merge the new data with the existing token
    const updatedToken = this.tokenRepository.merge(tokens, updateTokenDto);

    // Save the updated tokens to the database
    return await this.tokenRepository.save(updatedToken);
  }

  remove(id: string) {
    return `This action removes a #${id} token`;
  }

  async updateRefreshTokens(id: string, in_app_refresh_tokens: Record<string, number>): Promise<void> {
    await this.tokenRepository.update({ id }, { in_app_refresh_tokens });
  }
}
