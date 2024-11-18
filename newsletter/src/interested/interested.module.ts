import { Module } from '@nestjs/common';
import { InterestedService } from './interested.service';
import { InterestedController } from './interested.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interested } from './entities/interested.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interested])],
  controllers: [InterestedController],
  providers: [InterestedService],
  exports: [InterestedService],
})
export class InterestedModule {}
