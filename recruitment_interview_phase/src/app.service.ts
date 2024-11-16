import { Injectable } from '@nestjs/common';
import { InterviewsMainPage } from './app.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from './interviews/entities/interview.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewsRepository: Repository<Interview>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getInterviewsMainPage(): Promise<InterviewsMainPage | void> {
    // get all innterviews survey_uuid and field_to_distinct_the_survey_2
  }
}
