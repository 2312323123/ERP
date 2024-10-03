import { Injectable } from '@nestjs/common';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from './entities/recruitment.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class RecruitmentsService {
  constructor(@InjectRepository(Recruitment) private recruitmentRepository: Repository<Recruitment>) {}

  async create(createRecruitmentDto: CreateRecruitmentDto): Promise<Recruitment> {
    const { name, grading_instruction } = createRecruitmentDto;
    const recruitment = new Recruitment();
    recruitment.name = name;
    recruitment.start_date_time = new Date();
    recruitment.survey_sending_secret = randomBytes(63).toString('hex'); // Generate 126 characters (63 bytes)
    recruitment.grading_instruction = grading_instruction;

    return this.recruitmentRepository.save(recruitment);
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
