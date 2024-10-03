import { Module } from '@nestjs/common';
import { RecruitmentsService } from './recruitments.service';
import { RecruitmentsController } from './recruitments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruitment } from './entities/recruitment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recruitment])],
  controllers: [RecruitmentsController],
  providers: [RecruitmentsService],
})
export class RecruitmentsModule {}
