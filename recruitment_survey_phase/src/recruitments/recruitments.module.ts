import { Module } from '@nestjs/common';
import { RecruitmentsService } from './recruitments.service';
import { RecruitmentsController } from './recruitments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { ActiveRecruitment } from 'src/active_recruitment/entities/active_recruitment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recruitment, ActiveRecruitment])],
  controllers: [RecruitmentsController],
  providers: [RecruitmentsService],
  exports: [RecruitmentsService],
})
export class RecruitmentsModule {}
