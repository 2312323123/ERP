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
import { ActiveRecruitmentService } from 'src/active_recruitment/active_recruitment.service';
import { Mark } from 'src/marks/entities/mark.entity';
import { Comment } from 'src/comments/entities/comment.entity';

const weightedRandom = <T>(arr: T[]): T | undefined => {
  const weights = arr.map((_, i) => 1 / (i + 1)); // Higher weights for earlier elements
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (let i = 0; i < arr.length; i++) {
    cumulativeWeight += weights[i];
    if (random < cumulativeWeight) return arr[i];
  }
};

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
    private readonly activeRecruitmentService: ActiveRecruitmentService,
    @InjectRepository(Mark) private markRepository: Repository<Mark>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
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

    // get survey_metadata for relation of mark
    const surveyMetadata = await this.surveyMetadataRepository.findOneBy({ uuid: survey_uuid });

    if (!surveyMetadata) {
      throw new NotFoundException('Survey metadata not found');
    }

    await this.marksService.storeMarks(userId, survey_uuid, marks, surveyMetadata);
    await this.commentsService.storeComment(userId, survey_uuid, comment, surveyMetadata);
  }

  async reEvaluateSurvey(userId: string, survey_uuid: string, marks: number[], comment: string) {
    // filter out some extreme cases
    if (comment.length > 10000) {
      throw new BadRequestException('Comment is too long');
    }
    const evaluationExists = await this.marksService.suchMarksExist(userId, survey_uuid);

    if (!evaluationExists) {
      throw new BadRequestException('Evaluation does not exist. Use evaluate endpoint if you want to create it');
    }

    // also here to avoid setting marks and not setting the comment
    const marksValid = marks.every((mark) => [1, 2, 3, 4, 5].includes(mark));
    if (!marksValid) {
      throw new BadRequestException('Each mark has to be one of 1, 2, 3, 4, 5');
    }

    const commentExists = await this.commentsService.suchCommentExist(userId, survey_uuid);

    if (!commentExists) {
      throw new BadRequestException('Comment does not exist. Use evaluate endpoint if you want to create it');
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

    // get survey_metadata for relation of mark
    const surveyMetadata = await this.surveyMetadataRepository.findOneBy({ uuid: survey_uuid });

    if (!surveyMetadata) {
      throw new NotFoundException('Survey metadata not found');
    }

    await this.marksService.updateMarks(userId, survey_uuid, marks);
    await this.commentsService.updateComment(userId, survey_uuid, comment);
  }

  async getSurveyUuidsByUserAndRecruitment(userUuid: string, recruitmentUuid: string): Promise<string[]> {
    const results = await this.markRepository
      .createQueryBuilder('mark')
      .select('mark.survey_uuid')
      .innerJoin('mark.survey_metadata', 'survey_metadata') // Join Mark to SurveyMetadata via survey_uuid
      .innerJoin('survey_metadata.recruitment', 'recruitment') // Join SurveyMetadata to EvaluationSchema via recruitment_uuid
      .where('mark.evaluator_id = :userUuid', { userUuid })
      .andWhere('recruitment.uuid = :recruitmentUuid', { recruitmentUuid })
      .getMany();

    return results.map((result) => result.survey_uuid);
  }

  async getAllSurveyUuidsFromRecruitment(recruitmentUuid: string): Promise<string[]> {
    const results = await this.surveyMetadataRepository
      .createQueryBuilder('survey_metadata')
      .select('survey_metadata.uuid')
      .innerJoin('survey_metadata.recruitment', 'recruitment') // Join SurveyMetadata to Recruitment via recruitment_uuid
      .where('recruitment.uuid = :recruitmentUuid', { recruitmentUuid })
      .getMany();

    return results.map((result) => result.uuid);
  }

  async getNotEvaluatedOne(userId: string): Promise<Survey | null> {
    // get uuids of evaluated surveys by given user from active recruitment
    const activeRecruitmentUuid = (await this.activeRecruitmentService.getActiveRecruitmentNameUuid())?.uuid;
    if (!activeRecruitmentUuid) {
      throw new NotFoundException('No active recruitment found');
    }
    const evaluatedSurveyUuids = await this.getSurveyUuidsByUserAndRecruitment(userId, activeRecruitmentUuid);

    // get uuids of all surveys from active recruitment
    const allSurveyUuids = await this.getAllSurveyUuidsFromRecruitment(activeRecruitmentUuid);

    // get the difference
    const difference = allSurveyUuids.filter((uuid) => !evaluatedSurveyUuids.includes(uuid));

    // get random (weithtedRandom) uuid from the difference
    const randomUuid = weightedRandom(difference);

    if (!randomUuid) {
      return null;
    }

    // get the survey by uuid
    const theSurvey = await this.getSurvey(randomUuid);

    // return the survey
    return theSurvey;
  }

  async getEvaluatedSurveyUuidsInChronologicalOrder(userId: string, recruitmentUuid: string): Promise<string[]> {
    const results = await this.commentRepository
      .createQueryBuilder('comment')
      .select('comment.survey_uuid')
      .innerJoin('comment.survey_metadata', 'survey_metadata')
      .innerJoin('survey_metadata.recruitment', 'recruitment')
      .where('comment.evaluator_id = :userId', { userId })
      .andWhere('recruitment.uuid = :recruitmentUuid', { recruitmentUuid })
      .orderBy('comment.createdAt', 'DESC')
      .getMany();

    return results.map((result) => result.survey_uuid);
  }

  async getPreviousSurveyUuid(userId: string, current_survey_uuid: string): Promise<string | null> {
    // get Array<survey_uuid> from current recruitment in chronological order by creation of their evaluation
    const activeRecruitmentNameUuid = await this.activeRecruitmentService.getActiveRecruitmentNameUuid();

    if (!activeRecruitmentNameUuid || !activeRecruitmentNameUuid.uuid) {
      throw new NotFoundException('Active recruitment UUID not found.');
    }

    const { uuid: recruitmentUuid } = activeRecruitmentNameUuid;

    // get Array<survey_uuid> from current recruitment in chronological order by creation of their evaluation
    const evaluatedSurveysDescending = await this.getEvaluatedSurveyUuidsInChronologicalOrder(userId, recruitmentUuid);

    // find the index of the current survey in array
    const currentSurveyIndex = evaluatedSurveysDescending.indexOf(current_survey_uuid);

    // if current_survey_uuid not in array
    if (currentSurveyIndex === -1) {
      // if such survey exists, return the latest evaluated one's id
      // and if it doesn't exist, 404
      try {
        await this.getSurvey(current_survey_uuid);
      } catch {
        throw new NotFoundException('Survey with provided id not found');
      }

      if (evaluatedSurveysDescending.length === 0) {
        return null;
      } else {
        return evaluatedSurveysDescending[0];
      }
    }

    // return the previous survey_uuid, or null if there is no previous survey
    return evaluatedSurveysDescending[currentSurveyIndex + 1] || null;
  }

  async getNextSurveyUuid(userId: string, current_survey_uuid: string): Promise<string | null> {
    // get Array<survey_uuid> from current recruitment in chronological order by creation of their evaluation
    const activeRecruitmentNameUuid = await this.activeRecruitmentService.getActiveRecruitmentNameUuid();

    if (!activeRecruitmentNameUuid || !activeRecruitmentNameUuid.uuid) {
      throw new NotFoundException('Active recruitment UUID not found.');
    }

    const { uuid: recruitmentUuid } = activeRecruitmentNameUuid;

    // get Array<survey_uuid> from current recruitment in chronological order by creation of their evaluation
    const evaluatedSurveysDescending = await this.getEvaluatedSurveyUuidsInChronologicalOrder(userId, recruitmentUuid);

    // find the index of the current survey in array
    const currentSurveyIndex = evaluatedSurveysDescending.indexOf(current_survey_uuid);

    // if current_survey_uuid not in array
    if (currentSurveyIndex === -1) {
      // if such survey exists, return null
      // and if it doesn't exist, 404
      try {
        await this.getSurvey(current_survey_uuid);
      } catch {
        throw new NotFoundException('Survey with provided id not found');
      }

      return null;
    }

    // if there's later one, return it, else getNotEvaluatedOne.uuid, and if it gets null, return null
    return evaluatedSurveysDescending[currentSurveyIndex - 1] || (await this.getNotEvaluatedOne(userId))?.uuid || null;
  }
}
