import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSurveyMetadataDto } from './dto/create-survey_metadata.dto';
import { UpdateSurveyMetadataDto } from './dto/update-survey_metadata.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyMetadata } from './entities/survey_metadata.entity';
import { Repository } from 'typeorm';
import { Recruitment } from 'src/recruitments/entities/recruitment.entity';

@Injectable()
export class SurveyMetadatasService {
  constructor(
    @InjectRepository(SurveyMetadata) private surveyMetadataRepository: Repository<SurveyMetadata>,
    @InjectRepository(Recruitment) private recruitmentRepository: Repository<Recruitment>,
  ) {}

  // create(createSurveyMetadataDto: CreateSurveyMetadataDto) {
  //   return 'This action adds a new surveyMetadata';
  // }

  // findAll() {
  //   return `This action returns all surveyMetadatas`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} surveyMetadata`;
  // }

  // update(id: number, updateSurveyMetadataDto: UpdateSurveyMetadataDto) {
  //   return `This action updates a #${id} surveyMetadata`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} surveyMetadata`;
  // }

  async create({ recruitmentUuid }: CreateSurveyMetadataDto) {
    let recruitment: Recruitment;
    try {
      recruitment = await this.recruitmentRepository.findOneOrFail({
        where: { uuid: recruitmentUuid },
      });
    } catch {
      throw new BadRequestException('Recruitment not found');
    }

    const surveyMetadata = new SurveyMetadata();
    surveyMetadata.recruitment = recruitment;
    return this.surveyMetadataRepository.save(surveyMetadata);
  }
}
