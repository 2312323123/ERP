import { Injectable } from '@nestjs/common';
import { CreateValidJwtCachDto } from './dto/create-valid_jwt_cach.dto';
import { UpdateValidJwtCachDto } from './dto/update-valid_jwt_cach.dto';

@Injectable()
export class ValidJwtCachesService {
  create(createValidJwtCachDto: CreateValidJwtCachDto) {
    return 'This action adds a new validJwtCach';
  }

  findAll() {
    return `This action returns all validJwtCaches`;
  }

  findOne(id: string) {
    return `This action returns a #${id} validJwtCach`;
  }

  update(id: string, updateValidJwtCachDto: UpdateValidJwtCachDto) {
    return `This action updates a #${id} validJwtCach`;
  }

  remove(id: string) {
    return `This action removes a #${id} validJwtCach`;
  }
}
