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

  async create(createCanPeopleSeeRecruitmentDto: CreateCanPeopleSeeRecruitmentDto) {
    // Check if the value is a boolean
    if (typeof createCanPeopleSeeRecruitmentDto.can_people_see_recruitment === 'boolean') {
      // Await the repository update
      await this.canPeopleSeeRecruitmentRepository.update(
        {},
        { can_people_see_recruitment: createCanPeopleSeeRecruitmentDto.can_people_see_recruitment },
      );
    } else {
      // Throw an exception if the value is not valid
      throw new BadRequestException('Invalid value for can_people_see_recruitment 4t54e');
    }
  }

  async getCanPeopleSeeRecruitment() {
    const res = await this.canPeopleSeeRecruitmentRepository.find({
      take: 1,
    });
    if (res === null) {
      throw new BadRequestException('No records in can_people_see_recruitment table t54r1');
    }
    return res[0];
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
