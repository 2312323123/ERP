import { Injectable } from '@nestjs/common';
import { CreateActiveRecruitmentDto } from './dto/create-active_recruitment.dto';
import { UpdateActiveRecruitmentDto } from './dto/update-active_recruitment.dto';

@Injectable()
export class ActiveRecruitmentsService {
  create(createActiveRecruitmentDto: CreateActiveRecruitmentDto) {
    return 'This action adds a new activeRecruitment';
  }

  findAll() {
    return `This action returns all activeRecruitments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activeRecruitment`;
  }

  update(id: number, updateActiveRecruitmentDto: UpdateActiveRecruitmentDto) {
    return `This action updates a #${id} activeRecruitment`;
  }

  remove(id: number) {
    return `This action removes a #${id} activeRecruitment`;
  }
}
