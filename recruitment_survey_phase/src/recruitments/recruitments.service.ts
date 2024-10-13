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

export interface RecruitmentRelatedData {
  grading_instruction: string;
  fieldsNotToShow: Array<string>;
  fieldToDistinctTheSurvey: string;
  evaluationCriteriaSetup: {
    criteria: Array<{
      name: string;
      description: string;
      weight: number;
    }>;
    markTags: {
      mark1Tag: string;
      mark2Tag: string;
      mark3Tag: string;
      mark4Tag: string;
      mark5Tag: string;
    };
  };
}

const recruitmentCreateDefaults = {
  grading_instruction: `# Hi, *Pluto*!
  Rekru czy coś`,
  fieldsNotToShow: [''] as Array<string>,
  fieldToDistinctTheSurvey: '',
  evaluationCriteriaSetup: {
    criteria: [
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
  ) {}

  async create(createRecruitmentDto: CreateRecruitmentDto): Promise<Recruitment> {
    const { name, copy_from_uuid } = createRecruitmentDto;
    const recruitment = new Recruitment();
    if (name) {
      recruitment.name = name;
    }
    recruitment.start_date_time = new Date();
    recruitment.survey_sending_secret = randomBytes(63).toString('hex'); // Generate 126 characters (63 bytes)
    recruitment.grading_instruction = recruitmentCreateDefaults.grading_instruction;

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
          new UpdateRecruitmentDto({ grading_instruction: recruitmentToCopyFrom.grading_instruction }),
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
        activeRecruitment.recruitment_uuid = createdRecruitment.uuid;
        await this.activeRecruitmentRepository.save(activeRecruitment);
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
      new UpdateRecruitmentDto({ grading_instruction: recruitmentRelatedData.grading_instruction }),
    );

    for (const field of recruitmentRelatedData.fieldsNotToShow) {
      const fieldsHiddenForSurveyEvaluator = new FieldsHiddenForSurveyEvaluator();
      fieldsHiddenForSurveyEvaluator.recruitment_uuid = uuid;
      fieldsHiddenForSurveyEvaluator.field = field;
      await this.fieldsHiddenForSurveyEvaluatorRepository.save(fieldsHiddenForSurveyEvaluator);
    }

    const markGradeName = new MarkGradeName();
    markGradeName.recruitment_uuid = uuid;
    markGradeName.grade_1_of_5 = recruitmentRelatedData.evaluationCriteriaSetup.markTags.mark1Tag;
    markGradeName.grade_2_of_5 = recruitmentRelatedData.evaluationCriteriaSetup.markTags.mark2Tag;
    markGradeName.grade_3_of_5 = recruitmentRelatedData.evaluationCriteriaSetup.markTags.mark3Tag;
    markGradeName.grade_4_of_5 = recruitmentRelatedData.evaluationCriteriaSetup.markTags.mark4Tag;
    markGradeName.grade_5_of_5 = recruitmentRelatedData.evaluationCriteriaSetup.markTags.mark5Tag;
    await this.markGradeNameRepository.save(markGradeName);

    // order will be 0-indexed
    for (const [index, criterion] of recruitmentRelatedData.evaluationCriteriaSetup.criteria.entries()) {
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
    const recruitments = await this.recruitmentRepository.find();
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

      // Save the updated entity
      const updatedRecruitment = await this.recruitmentRepository.save(recruitmentToUpdate);

      return updatedRecruitment;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} recruitment`;
  }
}
