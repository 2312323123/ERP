import { PartialType } from '@nestjs/swagger';
import { CreateValidJwtCachDto } from './create-valid_jwt_cach.dto';

export class UpdateValidJwtCachDto extends PartialType(CreateValidJwtCachDto) {}
