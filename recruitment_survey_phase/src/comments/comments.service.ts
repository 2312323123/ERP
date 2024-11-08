import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

  async suchCommentExist(userId: string, survey_uuid: string): Promise<boolean> {
    return this.commentRepository
      .findOne({ where: { evaluator_uuid: userId, survey_uuid } })
      .then((comment) => !!comment);
  }

  async storeComment(userId: string, survey_uuid: string, comment: string): Promise<void> {
    if (comment.length > 10000) {
      throw new BadRequestException('Comment is too long');
    }
    const newComment = new Comment();
    newComment.evaluator_uuid = userId;
    newComment.survey_uuid = survey_uuid;
    newComment.text_value = comment;
    await this.commentRepository.save(newComment);
  }

  // create(createCommentDto: CreateCommentDto) {
  //   return 'This action adds a new comment';
  // }

  // findAll() {
  //   return `This action returns all comments`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} comment`;
  // }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} comment`;
  // }
}
