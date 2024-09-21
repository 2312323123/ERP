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

  findOne(id: number) {
    return `This action returns a #${id} validJwtCach`;
  }

  update(id: number, updateValidJwtCachDto: UpdateValidJwtCachDto) {
    return `This action updates a #${id} validJwtCach`;
  }

  remove(id: number) {
    return `This action removes a #${id} validJwtCach`;
  }
}
