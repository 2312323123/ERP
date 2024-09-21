import { Module } from '@nestjs/common';
import { ValidJwtCachesService } from './valid_jwt_caches.service';
import { ValidJwtCachesController } from './valid_jwt_caches.controller';
import { ValidJwtCach } from './entities/valid_jwt_cach.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ValidJwtCach])],
  controllers: [ValidJwtCachesController],
  providers: [ValidJwtCachesService],
})
export class ValidJwtCachesModule {}
