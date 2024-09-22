import { Module } from '@nestjs/common';
import { ActiveRecruitmentsService } from './active_recruitments.service';
import { ActiveRecruitmentsController } from './active_recruitments.controller';

@Module({
  controllers: [ActiveRecruitmentsController],
  providers: [ActiveRecruitmentsService],
})
export class ActiveRecruitmentsModule {}
