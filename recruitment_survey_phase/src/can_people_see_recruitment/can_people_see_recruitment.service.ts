import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCanPeopleSeeRecruitmentDto } from './dto/create-can_people_see_recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CanPeopleSeeRecruitment } from './entities/can_people_see_recruitment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CanPeopleSeeRecruitmentService {
  constructor(
    @InjectRepository(CanPeopleSeeRecruitment)
    private canPeopleSeeRecruitmentRepository: Repository<CanPeopleSeeRecruitment>,
  ) {}

  create(createCanPeopleSeeRecruitmentDto: CreateCanPeopleSeeRecruitmentDto) {
    // update all records to the value that was sent
    if (typeof createCanPeopleSeeRecruitmentDto.can_people_see_recruitment === 'boolean') {
      this.canPeopleSeeRecruitmentRepository.update(
        {},
        { can_people_see_recruitment: createCanPeopleSeeRecruitmentDto.can_people_see_recruitment },
      );
    } else {
      throw new BadRequestException('Invalid value for can_people_see_recruitment 4t54e');
    }
  }

  async getCanPeopleSeeRecruitment() {
    return await this.canPeopleSeeRecruitmentRepository.findOne({});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} canPeopleSeeRecruitment`;
  // }

  // update(id: number, updateCanPeopleSeeRecruitmentDto: UpdateCanPeopleSeeRecruitmentDto) {
  //   return `This action updates a #${id} canPeopleSeeRecruitment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} canPeopleSeeRecruitment`;
  // }
}
