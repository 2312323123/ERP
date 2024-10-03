import { Injectable } from '@nestjs/common';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recruitment } from './entities/recruitment.entity';

@Injectable()
export class RecruitmentsService {
  constructor(@InjectRepository(Recruitment) private recruitmentRepository: Repository<Recruitment>) {}

  create(createRecruitmentDto: CreateRecruitmentDto) {
    return 'This action adds a new recruitment';
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
