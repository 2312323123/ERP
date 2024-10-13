import { Injectable } from '@nestjs/common';
import { CreateActiveRecruitmentDto } from './dto/create-active_recruitment.dto';
import { UpdateActiveRecruitmentDto } from './dto/update-active_recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveRecruitment } from './entities/active_recruitment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActiveRecruitmentService {
  constructor(
    @InjectRepository(ActiveRecruitment) private activeRecruitmentRepository: Repository<ActiveRecruitment>,
  ) {}

  create(createActiveRecruitmentDto: CreateActiveRecruitmentDto) {
    return 'This action adds a new activeRecruitment';
  }

  findAll() {
    return `This action returns all activeRecruitment`;
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

  async getActiveRecruitmentNameUuid(): Promise<{ name: string; uuid: string } | undefined> {
    const activeRecruitment = (
      await this.activeRecruitmentRepository.find({
        order: { recruitment_uuid: 'ASC' }, // Replace 'id' with the appropriate column
        take: 1, // Take only the first record,
        relations: ['recruitment'], // Load the 'recruitment' relationship
      })
    )[0];

    if (activeRecruitment?.recruitment) {
      return { name: activeRecruitment.recruitment.name ?? '', uuid: activeRecruitment.recruitment.uuid };
    }
    return undefined;
  }
}
