import { Injectable } from '@nestjs/common';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { randomBytes } from 'crypto';
import { ActiveRecruitment } from 'src/active_recruitment/entities/active_recruitment.entity';
import { MarkGradeName } from 'src/mark_grade_names/entities/mark_grade_name.entity';
import { FieldsHiddenForSurveyEvaluator } from 'src/fields_hidden_for_survey_evaluators/entities/fields_hidden_for_survey_evaluator.entity';
import { EvaluationSchema } from 'src/evaluation_schemas/entities/evaluation_schema.entity';
import {
  CreateRecruitmentRelatedDataForFrontendDto,
  RecruitmentRelatedData,
} from './dto/create-recruitment-related-data-for-frontend.dto copy';
import { Mark } from 'src/marks/entities/mark.entity';
import { SurveyMetadata } from 'src/survey_metadatas/entities/survey_metadata.entity';

const recruitmentCreateDefaults: RecruitmentRelatedData = {
  gradingInstruction: `# Hi, *Pluto*!
  Rekru czy coś`,
  fieldsNotToShow: [''] as Array<string>,
  fieldToDistinctTheSurvey: 'imię',
  evaluationCriteria: [
    {
      name: 'Przykładowe kryterium',
      description: 'Opis przykładowego kryterium',
      weight: 2,
    },
  ],
  markTags: {
    mark1Tag: '',
    mark2Tag: '',
    mark3Tag: 'Jest OK',
    mark4Tag: '',
    mark5Tag: '',
  },
};

@Injectable()
export class RecruitmentsService {
  constructor(
    @InjectRepository(Recruitment) private recruitmentRepository: Repository<Recruitment>,
    @InjectRepository(ActiveRecruitment) private activeRecruitmentRepository: Repository<ActiveRecruitment>,
    @InjectRepository(MarkGradeName) private markGradeNameRepository: Repository<MarkGradeName>,
    @InjectRepository(FieldsHiddenForSurveyEvaluator)
    private fieldsHiddenForSurveyEvaluatorRepository: Repository<FieldsHiddenForSurveyEvaluator>,
    @InjectRepository(EvaluationSchema) private evaluationSchemaRepository: Repository<EvaluationSchema>,
    @InjectRepository(Mark) private markRepository: Repository<Mark>,
    @InjectRepository(SurveyMetadata) private surveyMetadataRepository: Repository<SurveyMetadata>,
  ) {}

  async create(createRecruitmentDto: CreateRecruitmentDto): Promise<Recruitment> {
    const { name, copy_from_uuid } = createRecruitmentDto;
    const recruitment = new Recruitment();
    if (name) {
      recruitment.name = name;
    }
    recruitment.start_date_time = new Date();
    recruitment.survey_sending_secret = randomBytes(63).toString('hex'); // Generate 126 characters (63 bytes)
    recruitment.grading_instruction = recruitmentCreateDefaults.gradingInstruction;
    recruitment.field_to_distinct_the_survey = recruitmentCreateDefaults.fieldToDistinctTheSurvey;

    // save the recruitment
    const createdRecruitment = await this.recruitmentRepository.save(recruitment);

    // copy settings from another recruitment if copy_from_uuid is provided and such recruitment exists
    if (copy_from_uuid) {
      const recruitmentToCopyFrom = await this.recruitmentRepository.findOne({
        where: { uuid: copy_from_uuid },
      });
      if (recruitmentToCopyFrom) {
        await this.updateRecruitment(
          createdRecruitment.uuid,
          new UpdateRecruitmentDto({
            grading_instruction: recruitmentToCopyFrom.grading_instruction,
            field_to_distinct_the_survey: recruitmentToCopyFrom.field_to_distinct_the_survey,
          }),
        );
      }
      this.createRecruitmentRelatedEntitiesFromExistingRecruitment(createdRecruitment, copy_from_uuid);
    } else {
      // create from the defaults
      this.createRecruitmentRelatedEntitiesFromObject(createdRecruitment, recruitmentCreateDefaults);
    }

    // set active_recruitment as the created recruitment
    const activeRecruitmentCount = await this.activeRecruitmentRepository.count();
    if (activeRecruitmentCount === 0) {
      const activeRecruitment = new ActiveRecruitment();
      activeRecruitment.recruitment_uuid = createdRecruitment.uuid;
      const initialEntity = this.activeRecruitmentRepository.create(activeRecruitment);
      await this.activeRecruitmentRepository.save(initialEntity);
    } else {
      const activeRecruitment = (await this.activeRecruitmentRepository.find())[0];
      if (activeRecruitment) {
        await this.activeRecruitmentRepository.update({}, { recruitment_uuid: createdRecruitment.uuid });
      } else {
        console.log('some really weird error 4y6hy5tr489');
      }
    }

    return createdRecruitment;
  }

  async createRecruitmentRelatedEntitiesFromObject(
    createdRecruitment: Recruitment,
    recruitmentRelatedData: RecruitmentRelatedData,
  ): Promise<void> {
    const { uuid } = createdRecruitment;

    await this.updateRecruitment(
      createdRecruitment.uuid,
      new UpdateRecruitmentDto({
        grading_instruction: recruitmentRelatedData.gradingInstruction,
        field_to_distinct_the_survey: recruitmentRelatedData.fieldToDistinctTheSurvey,
      }),
    );

    for (const field of recruitmentRelatedData.fieldsNotToShow) {
      const fieldsHiddenForSurveyEvaluator = new FieldsHiddenForSurveyEvaluator();
      fieldsHiddenForSurveyEvaluator.recruitment_uuid = uuid;
      fieldsHiddenForSurveyEvaluator.field = field;
      await this.fieldsHiddenForSurveyEvaluatorRepository.save(fieldsHiddenForSurveyEvaluator);
    }

    const markGradeName = new MarkGradeName();
    markGradeName.recruitment_uuid = uuid;
    markGradeName.grade_1_of_5 = recruitmentRelatedData.markTags.mark1Tag;
    markGradeName.grade_2_of_5 = recruitmentRelatedData.markTags.mark2Tag;
    markGradeName.grade_3_of_5 = recruitmentRelatedData.markTags.mark3Tag;
    markGradeName.grade_4_of_5 = recruitmentRelatedData.markTags.mark4Tag;
    markGradeName.grade_5_of_5 = recruitmentRelatedData.markTags.mark5Tag;
    await this.markGradeNameRepository.save(markGradeName);

    // order will be 0-indexed
    for (const [index, criterion] of recruitmentRelatedData.evaluationCriteria.entries()) {
      const evaluationSchema = new EvaluationSchema();
      evaluationSchema.recruitment_uuid = uuid;
      evaluationSchema.order = index;
      evaluationSchema.name = criterion.name;
      evaluationSchema.description = criterion.description;
      evaluationSchema.weight = criterion.weight;
      await this.evaluationSchemaRepository.save(evaluationSchema);
    }
  }

  async createRecruitmentRelatedEntitiesFromExistingRecruitment(
    createdRecruitment: Recruitment,
    copyFromUuid: string,
  ): Promise<void> {
    return;
  }

  async getAllRecruitmentsUuidNameStartDate(): Promise<{ uuid: string; name: string; startDate: Date }[]> {
    const recruitments = await this.recruitmentRepository.find({
      order: { start_date_time: 'DESC' },
    });
    return recruitments.map((recruitment) => ({
      uuid: recruitment.uuid,
      name: recruitment.name,
      startDate: recruitment.start_date_time,
    }));
  }

  findAll() {
    return `This action returns all recruitments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recruitment`;
  }

  async updateRecruitment(uuid: string, updateRecruitmentDto: UpdateRecruitmentDto) {
    const recruitmentToUpdate = await this.recruitmentRepository.findOne({
      where: { uuid },
    });

    if (recruitmentToUpdate) {
      if (updateRecruitmentDto.grading_instruction) {
        // Modify the fields you want to update
        recruitmentToUpdate.grading_instruction = updateRecruitmentDto.grading_instruction;
      }

      if (updateRecruitmentDto.field_to_distinct_the_survey) {
        recruitmentToUpdate.field_to_distinct_the_survey = updateRecruitmentDto.field_to_distinct_the_survey;
      }

      // Save the updated entity
      const updatedRecruitment = await this.recruitmentRepository.save(recruitmentToUpdate);

      return updatedRecruitment;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} recruitment`;
  }

  async getActiveRecruitmentDataForFrontend(): Promise<CreateRecruitmentRelatedDataForFrontendDto | null> {
    const { recruitment_uuid: uuid } = (await this.activeRecruitmentRepository.find())[0];

    if (!uuid) {
      return null;
    }

    const recruitment = await this.recruitmentRepository.findOne({
      where: { uuid },
    });

    if (!recruitment) {
      return null;
    }

    const fieldsHiddenForSurveyEvaluator = await this.fieldsHiddenForSurveyEvaluatorRepository.find({
      where: { recruitment_uuid: uuid },
    });

    const markGradeName = await this.markGradeNameRepository.findOne({
      where: { recruitment_uuid: uuid },
    });

    const evaluationSchemas = await this.evaluationSchemaRepository.find({
      where: { recruitment_uuid: uuid },
      order: { order: 'ASC' },
    });

    const recruitmentRelatedData = new CreateRecruitmentRelatedDataForFrontendDto();
    recruitmentRelatedData.gradingInstruction = recruitment.grading_instruction;
    recruitmentRelatedData.token = recruitment.survey_sending_secret;
    recruitmentRelatedData.fieldToDistinctTheSurvey = recruitment.field_to_distinct_the_survey;

    recruitmentRelatedData.fieldsNotToShow = fieldsHiddenForSurveyEvaluator.map((field) => field.field);

    if (markGradeName) {
      recruitmentRelatedData.markTags = {
        mark1Tag: markGradeName.grade_1_of_5,
        mark2Tag: markGradeName.grade_2_of_5,
        mark3Tag: markGradeName.grade_3_of_5,
        mark4Tag: markGradeName.grade_4_of_5,
        mark5Tag: markGradeName.grade_5_of_5,
      };
    }

    recruitmentRelatedData.evaluationCriteria = evaluationSchemas.map((schema) => ({
      name: schema.name,
      description: schema.description,
      weight: schema.weight,
    }));

    // isThereAnyMark
    recruitmentRelatedData.isThereAnyMark = await this.checkIfMarkExistsForRecruitment(uuid);

    // isThereAnySurvey
    recruitmentRelatedData.isThereAnySurvey = await this.checkIfAnySurveyExistsForRecruitment(uuid);

    return recruitmentRelatedData;
  }

  // Check if any Mark exists for a given Recruitment UUID
  async checkIfMarkExistsForRecruitment(recruitmentUuid: string): Promise<boolean> {
    const markExists = await this.markRepository
      .createQueryBuilder('mark')
      .innerJoin('mark.survey_metadata', 'survey_metadata')
      .innerJoin('survey_metadata.recruitment', 'recruitment')
      .where('recruitment.uuid = :recruitmentUuid', { recruitmentUuid })
      .getCount(); // Get the count of matching Mark records

    return markExists > 0; // Return true if any Mark exists, otherwise false
  }

  // Check if SurveyMetadata exists for a given Recruitment
  async checkIfAnySurveyExistsForRecruitment(recruitmentUuid: string): Promise<boolean> {
    const surveyMetadata = await this.surveyMetadataRepository.findOne({
      where: { recruitment: { uuid: recruitmentUuid } }, // Search by recruitment's uuid
      relations: ['recruitment'], // Ensure relation with Recruitment is loaded
    });

    return !!surveyMetadata; // Return true if found, otherwise false
  }
}
