import { Injectable } from '@nestjs/common';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { randomBytes } from 'crypto';
import { ActiveRecruitment } from 'src/active_recruitment/entities/active_recruitment.entity';

@Injectable()
export class RecruitmentsService {
  constructor(
    @InjectRepository(Recruitment) private recruitmentRepository: Repository<Recruitment>,
    @InjectRepository(ActiveRecruitment) private activeRecruitmentRepository: Repository<ActiveRecruitment>,
  ) {}

  async create(createRecruitmentDto: CreateRecruitmentDto): Promise<Recruitment> {
    const { name, grading_instruction } = createRecruitmentDto;
    const recruitment = new Recruitment();
    recruitment.name = name;
    recruitment.start_date_time = new Date();
    recruitment.survey_sending_secret = randomBytes(63).toString('hex'); // Generate 126 characters (63 bytes)
    recruitment.grading_instruction = grading_instruction ?? '';
    const createdRecruitment = await this.recruitmentRepository.save(recruitment);

    // set active_recruitment as the created recruitment
    const activeRecruitmentCount = await this.activeRecruitmentRepository.count();
    if (activeRecruitmentCount === 0) {
      const activeRecruitment = new ActiveRecruitment();
      activeRecruitment.recruitment_uuid = createdRecruitment.uuid;
      const initialEntity = this.activeRecruitmentRepository.create(activeRecruitment);
      await this.activeRecruitmentRepository.save(initialEntity);
    } else {
      const activeRecruitment = await this.activeRecruitmentRepository.findOne({});
      if (activeRecruitment) {
        activeRecruitment.recruitment_uuid = createdRecruitment.uuid;
        await this.activeRecruitmentRepository.save(activeRecruitment);
      } else {
        console.log('some really weird error 4y6hy5tr489');
      }
    }

    return createdRecruitment;
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

  update(id: number, updateRecruitmentDto: UpdateRecruitmentDto) {
    return `This action updates a #${id} recruitment`;
  }

  remove(id: number) {
    return `This action removes a #${id} recruitment`;
  }
}
