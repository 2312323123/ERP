import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Survey } from './schemas/survey.schema';
import { Model } from 'mongoose';
import { MarksService } from 'src/marks/marks.service';
import { CommentsService } from 'src/comments/comments.service';
import { CanEvaluateSurveysService } from 'src/can_evaluate_surveys/can_evaluate_surveys.service';
import { SurveyMetadata } from 'src/survey_metadatas/entities/survey_metadata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveRecruitment } from 'src/active_recruitment/entities/active_recruitment.entity';
import { EvaluationSchemasService } from 'src/evaluation_schemas/evaluation_schemas.service';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name) private surveyModel: Model<Survey>,
    private readonly marksService: MarksService,
    private readonly commentsService: CommentsService,
    private readonly canEvaluateSurveysService: CanEvaluateSurveysService,
    @InjectRepository(SurveyMetadata) private surveyMetadataRepository: Repository<SurveyMetadata>,
    @InjectRepository(ActiveRecruitment) private activeRecruitmentRepository: Repository<ActiveRecruitment>,
    private readonly evaluationSchemasService: EvaluationSchemasService,
  ) {}

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const createdSurvey = new this.surveyModel(createSurveyDto);
    return createdSurvey.save();
  }

  async getSurvey(uuid: string): Promise<Survey> {
    const survey = await this.surveyModel.findOne({ uuid });
    if (!survey) {
      throw new NotFoundException('Survey not found');
    }
    return survey;
  }

  async evaluateSurvey(userId: string, survey_uuid: string, marks: number[], comment: string) {
    // filter out some extreme cases
    if (comment.length > 10000) {
      throw new BadRequestException('Comment is too long');
    }
    const evaluationExists = await this.marksService.suchMarksExist(userId, survey_uuid);

    if (evaluationExists) {
      throw new BadRequestException('Evaluation already exists. Use re-evaluate endpoint if you want to change it');
    }

    // also here to avoid setting marks and not setting the comment
    const marksValid = marks.every((mark) => [1, 2, 3, 4, 5].includes(mark));
    if (!marksValid) {
      throw new BadRequestException('Each mark has to be one of 1, 2, 3, 4, 5');
    }

    const commentExists = await this.commentsService.suchCommentExist(userId, survey_uuid);

    if (commentExists) {
      throw new BadRequestException('Comment already exists. Use re-evaluate endpoint if you want to change it');
    }

    const surveyExists = await this.surveyModel.exists({ uuid: survey_uuid });

    if (!surveyExists) {
      throw new NotFoundException('Survey not found');
    }

    // is evaluation enabled? if not, we should not allow evaluation
    const canEvaluateSurveys = await this.canEvaluateSurveysService.getCanEvaluateSurveys();

    if (!canEvaluateSurveys) {
      throw new BadRequestException('Evaluation is disabled');
    }

    // is survey a part of active recruitment? if not, we should not allow evaluation
    const surveyRecruitment = (
      await this.surveyMetadataRepository.find({
        where: { uuid: survey_uuid },
        relations: ['recruitment'], // Load the 'recruitment' relationship
      })
    )[0];
    const surveyRecruitmentUuid = surveyRecruitment?.recruitment?.uuid;
    if (!surveyRecruitmentUuid) {
      throw new NotFoundException('Recruitment of the survey not found');
    }
    const { recruitment_uuid: activeRecruitmentUuid } = (await this.activeRecruitmentRepository.find({ take: 1 }))[0];

    if (surveyRecruitmentUuid !== activeRecruitmentUuid) {
      throw new BadRequestException('Survey is not a part of active recruitment');
    }

    // amount of marks should match the amount of criteria in the settings
    const evaluationSchemasCount =
      await this.evaluationSchemasService.getRecruitmentEvaluationSchemasCount(activeRecruitmentUuid);
    if (evaluationSchemasCount === 0) {
      throw new InternalServerErrorException('There are no evaluation criteria for the recruitment');
    }

    if (marks.length !== evaluationSchemasCount) {
      console.log('marks.length:');
      console.log(marks.length);
      console.log('evaluationSchemasCount:');
      console.log(evaluationSchemasCount);
      throw new BadRequestException('Amount of marks does not match the amount of criteria');
    }

    await this.marksService.storeMarks(userId, survey_uuid, marks);
    await this.commentsService.storeComment(userId, survey_uuid, comment);
  }

  // async findAll(): Promise<Survey[]> {
  //   return this.surveyModel.find().exec();
  // }
}
