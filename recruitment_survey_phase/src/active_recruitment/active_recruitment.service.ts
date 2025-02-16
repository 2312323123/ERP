import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async getActiveRecruitmentUuid(): Promise<string | undefined> {
    return (await this.activeRecruitmentRepository.find())?.[0]?.recruitment_uuid ?? undefined;
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

  async getActiveRecruitmentToken(): Promise<string> {
    let activeRecruitment;
    try {
      activeRecruitment = await this.activeRecruitmentRepository.findOneOrFail({
        where: {},
        order: { recruitment_uuid: 'ASC' },
        relations: ['recruitment'], // load the 'recruitment' relationship
      });
    } catch {
      throw new NotFoundException('No active recruitment found');
    }

    return activeRecruitment.recruitment.survey_sending_secret;
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
