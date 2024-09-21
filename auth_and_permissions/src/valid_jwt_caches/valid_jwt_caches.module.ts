import { Module } from '@nestjs/common';
import { ValidJwtCachesService } from './valid_jwt_caches.service';
import { ValidJwtCachesController } from './valid_jwt_caches.controller';

@Module({
  controllers: [ValidJwtCachesController],
  providers: [ValidJwtCachesService],
})
export class ValidJwtCachesModule {}
