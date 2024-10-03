import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AcceptsSurvey } from 'src/accepts_surveys/entities/accepts_survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(@InjectRepository(AcceptsSurvey) private acceptsSurveyRepository: Repository<AcceptsSurvey>) {}

  async seedAcceptsSurvey() {
    const acceptsSurvey = this.acceptsSurveyRepository.create({ accepts_surveys: false });
    await this.acceptsSurveyRepository.save(acceptsSurvey);
  }
}
