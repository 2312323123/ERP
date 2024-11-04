import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActiveRecruitmentDto } from './dto/create-active_recruitment.dto';
import { UpdateActiveRecruitmentDto } from './dto/update-active_recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveRecruitment } from './entities/active_recruitment.entity';
import { Repository } from 'typeorm';
import { Recruitment } from 'src/recruitments/entities/recruitment.entity';

@Injectable()
export class ActiveRecruitmentService {
  constructor(
    @InjectRepository(ActiveRecruitment) private activeRecruitmentRepository: Repository<ActiveRecruitment>,
    @InjectRepository(Recruitment) private recruitmentRepository: Repository<Recruitment>,
  ) {}

  // create(createActiveRecruitmentDto: CreateActiveRecruitmentDto) {
  //   return 'This action adds a new activeRecruitment';
  // }

  // findAll() {
  //   return `This action returns all activeRecruitment`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} activeRecruitment`;
  // }

  // update(id: number, updateActiveRecruitmentDto: UpdateActiveRecruitmentDto) {
  //   return `This action updates a #${id} activeRecruitment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} activeRecruitment`;
  // }

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

  async getActiveRecruitmentToken(): Promise<string> {
    // could use .findOneOrFail() instead of .find() and then [0]
    const activeRecruitment = (
      await this.activeRecruitmentRepository.find({
        order: { recruitment_uuid: 'ASC' }, // Replace 'id' with the appropriate column
        take: 1, // Take only the first record,
        relations: ['recruitment'], // Load the 'recruitment' relationship
      })
    )[0];

    try {
      return activeRecruitment.recruitment.survey_sending_secret;
    } catch {
      throw new NotFoundException('No active recruitment found');
    }
  }

  async setActiveRecruitment(recruitmentUuid: string) {
    if (!recruitmentUuid) {
      throw new BadRequestException('Invalid recruitment UUID');
    }

    // initialize can_people_see_recruitment to false
    const activeRecruitmentCount = await this.activeRecruitmentRepository.count();
    if (activeRecruitmentCount === 0) {
      // if 0, create a new active recruitment

      const newActiveRecruitment = this.activeRecruitmentRepository.create({
        recruitment_uuid: recruitmentUuid,
      });
      await this.activeRecruitmentRepository.save(newActiveRecruitment);
    } else {
      // if not 0, update the existing active recruitment

      // check if the recruitment exists
      const recruitment = await this.recruitmentRepository.findOne({
        where: { uuid: recruitmentUuid },
      });

      if (!recruitment) {
        throw new BadRequestException('Recruitment does not exist');
      }

      // update the recruitment_uuid
      await this.activeRecruitmentRepository.update({}, { recruitment_uuid: recruitmentUuid });
    }
  }
}
