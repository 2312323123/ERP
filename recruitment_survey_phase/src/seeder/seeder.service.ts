import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AcceptsSurvey } from 'src/accepts_surveys/entities/accepts_survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(@InjectRepository(AcceptsSurvey) private acceptsSurveyRepository: Repository<AcceptsSurvey>) {}
  async onModuleInit() {
    await this.seedDatabase();
  }

  private async seedDatabase() {
    const count = await this.acceptsSurveyRepository.count();
    if (count === 0) {
      const initialEntity = this.acceptsSurveyRepository.create({
        accepts_surveys: false,
      });
      await this.acceptsSurveyRepository.save(initialEntity);
      console.log('Initial entity added to the accepts_surveys table');
    } else {
      console.log('accepts_surveys Table already has data, no seeding required');
    }
  }
}
