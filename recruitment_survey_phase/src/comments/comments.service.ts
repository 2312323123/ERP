import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { SurveyMetadata } from 'src/survey_metadatas/entities/survey_metadata.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

  async suchCommentExist(userId: string, survey_uuid: string): Promise<boolean> {
    return this.commentRepository
      .findOne({ where: { evaluator_id: userId, survey_uuid } })
      .then((comment) => !!comment);
  }

  async storeComment(
    userId: string,
    survey_uuid: string,
    comment: string,
    surveyMetadata: SurveyMetadata,
  ): Promise<void> {
    if (comment.length > 10000) {
      throw new BadRequestException('Comment is too long');
    }
    const newComment = new Comment();
    newComment.evaluator_id = userId;
    newComment.survey_uuid = survey_uuid;
    newComment.text_value = comment;
    newComment.survey_metadata = surveyMetadata;
    await this.commentRepository.save(newComment);
  }

  async updateComment(userId: string, survey_uuid: string, updatedComment: string): Promise<void> {
    if (updatedComment.length > 10000) {
      throw new BadRequestException('Comment is too long');
    }

    const existingComment = await this.commentRepository.findOne({
      where: {
        evaluator_id: userId,
        survey_uuid: survey_uuid,
      },
    });

    // throw error if the comment doesn't exist
    if (!existingComment) {
      throw new NotFoundException(`Comment not found for user ${userId} and survey ${survey_uuid}`);
    }

    // update the comment text
    existingComment.text_value = updatedComment;

    // save the updated comment
    await this.commentRepository.save(existingComment);
  }

  async getSurveysUuidsFromRecruitmentEvaluatedByUser(userId: string, recruitmentUuid: string): Promise<string[]> {
    return this.commentRepository
      .find({
        where: { evaluator_id: userId },
        relations: ['survey_metadata', 'survey_metadata.recruitment'],
      })
      .then((comments) => {
        return comments
          .filter((comment) => comment.survey_metadata.recruitment.uuid === recruitmentUuid)
          .map((comment) => comment.survey_uuid);
      });
  }

  // for surveys survey view panel
  async getAmountOfEvaluationsForSurveys(surveyUuids: string[]): Promise<{ [surveyUuid: string]: number }> {
    // Step 1: Fetch comment counts grouped by survey_uuid
    const rawResults = await this.commentRepository
      .createQueryBuilder('comment')
      .select('comment.survey_uuid', 'survey_uuid')
      .addSelect('COUNT(comment.survey_uuid)', 'count')
      .where('comment.survey_uuid IN (:...surveyUuids)', { surveyUuids })
      .groupBy('comment.survey_uuid')
      .getRawMany();

    // Step 2: Transform the result into the desired format
    const result: { [surveyUuid: string]: number } = {};

    rawResults.forEach((row) => {
      result[row.survey_uuid] = parseInt(row.count, 10);
    });

    return result;
  }
}
