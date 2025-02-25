import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from './entities/interview.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterviewsService {
  constructor(@InjectRepository(Interview) private interviewRepository: Repository<Interview>) {}

  async create(createInterviewDto: CreateInterviewDto) {
    if (!createInterviewDto.recruit_uuid) {
      throw new Error('recruit_uuid is required');
    }

    // get entry to update or set to create
    let toUpdate;
    try {
      toUpdate = await this.findOneOrError(createInterviewDto.recruit_uuid);
    } catch {
      toUpdate = null;
    }

    if (toUpdate) {
      // update
      await this.interviewRepository.update(createInterviewDto.recruit_uuid, createInterviewDto);
      return;
    }
    await this.interviewRepository.save(createInterviewDto);
  }

  async setOpinion(userId: string, updateInterviewDto: UpdateInterviewDto) {
    if (!updateInterviewDto.recruit_uuid) {
      throw new Error('recruit_uuid is required');
    }

    // update interviewer_review
    if (updateInterviewDto.interviewer_review) {
      const interview = await this.findOneOrError(updateInterviewDto.recruit_uuid);
      if (userId !== interview.interviewer_uuid) {
        throw new Error('You are not allowed to update this field 0');
      }
      interview.interviewer_review = updateInterviewDto.interviewer_review;
      await this.interviewRepository.update(updateInterviewDto.recruit_uuid, interview);
    }

    // update helper_1_review
    if (updateInterviewDto.helper_1_review) {
      const interview = await this.findOneOrError(updateInterviewDto.recruit_uuid);
      if (userId !== interview.helper_1_uuid) {
        throw new Error('You are not allowed to update this field 1');
      }
      interview.helper_1_review = updateInterviewDto.helper_1_review;
      await this.interviewRepository.update(updateInterviewDto.recruit_uuid, interview);
    }

    // update helper_2_review
    if (updateInterviewDto.helper_2_review) {
      const interview = await this.findOneOrError(updateInterviewDto.recruit_uuid);
      if (userId !== interview.helper_2_uuid) {
        throw new Error('You are not allowed to update this field 2');
      }
      interview.helper_2_review = updateInterviewDto.helper_2_review;
      await this.interviewRepository.update(updateInterviewDto.recruit_uuid, interview);
    }
  }

  async findOneOrError(recruit_uuid: string) {
    try {
      return await this.interviewRepository.findOneByOrFail({ recruit_uuid });
    } catch {
      throw new NotFoundException('Interview not found');
    }
  }

  async delete(recruit_uuid: string) {
    // only delete if no opinions
    const interview = await this.findOneOrError(recruit_uuid);
    if (interview.interviewer_review || interview.helper_1_review || interview.helper_2_review) {
      throw new UnauthorizedException('You are not allowed to delete this interview as it has opinions');
    }
    await this.interviewRepository.delete(recruit_uuid);
  }
}
