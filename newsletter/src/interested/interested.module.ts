import { Module } from '@nestjs/common';
import { InterestedService } from './interested.service';
import { InterestedController } from './interested.controller';

@Module({
  controllers: [InterestedController],
  providers: [InterestedService],
})
export class InterestedModule {}
