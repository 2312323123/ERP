import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';
import { In, Repository } from 'typeorm';
import { SurveyMetadata } from 'src/survey_metadatas/entities/survey_metadata.entity';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Comment } from 'src/comments/entities/comment.entity';

interface UserIdNamePicture {
  id: string;
  name: string;
  picture: string;
}
export interface UserEvaluation extends UserIdNamePicture {
  marks: number[];
  comment: string;
}
@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark) private markRepository: Repository<Mark>,
    private readonly httpService: HttpService,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async suchMarksExist(userId: string, survey_uuid: string): Promise<boolean> {
    return this.markRepository.findOne({ where: { evaluator_id: userId, survey_uuid } }).then((mark) => !!mark);
  }

  async storeMarks(
    userId: string,
    survey_uuid: string,
    marks: number[],
    surveyMetadata: SurveyMetadata,
  ): Promise<void> {
    if (marks.length > 100) {
      throw new BadRequestException('Marks array is too long');
    }
    const marksValid = marks.every((mark) => [1, 2, 3, 4, 5].includes(mark));
    if (!marksValid) {
      throw new BadRequestException('All marks have to be one of 1, 2, 3, 4, 5');
    }

    const markEntities = marks.map((markValue, index) => {
      const mark = new Mark();
      mark.evaluator_id = userId;
      mark.survey_uuid = survey_uuid;
      mark.order = index;
      mark.number_value = markValue;
      mark.survey_metadata = surveyMetadata;
      return mark;
    });

    await this.markRepository.save(markEntities);
  }

  async updateMarks(userId: string, survey_uuid: string, marks: number[]): Promise<void> {
    if (marks.length > 100) {
      throw new BadRequestException('Marks array is too long');
    }
    const marksValid = marks.every((mark) => [1, 2, 3, 4, 5].includes(mark));
    if (!marksValid) {
      throw new BadRequestException('All marks have to be one of 1, 2, 3, 4, 5');
    }

    // retrieve all required marks at once
    const existingMarks = await this.markRepository.find({
      where: {
        evaluator_id: userId,
        survey_uuid: survey_uuid,
        order: In(marks.map((_, index) => index)), // Fetch marks with specific orders
      },
      order: {
        order: 'ASC',
      },
    });

    // check if any mark is missing
    const existingOrders = new Set(existingMarks.map((mark) => mark.order));
    const missingOrders = marks.map((_, index) => index).filter((order) => !existingOrders.has(order));

    if (missingOrders.length > 0) {
      throw new NotFoundException(`Marks missing for orders: ${missingOrders.join(', ')}`);
    }

    // update marks as all required entries are present
    for (let i = 0; i < marks.length; i++) {
      const mark = existingMarks.find((m) => m.order === i);
      if (mark) {
        mark.number_value = marks[i];
      }
    }

    // save all updated marks at once
    await this.markRepository.save(existingMarks);
  }

  async getAllEvaluations(userId: string, authorization: string, surveyUuid: string): Promise<UserEvaluation[] | null> {
    // if user didn't evaluate, return null
    const userDidEvaluate = await this.suchMarksExist(userId, surveyUuid);
    if (!userDidEvaluate) {
      return null;
    }

    // get users
    let userIdsNamesPictures: UserIdNamePicture[];
    try {
      const response = await lastValueFrom(
        this.httpService.get<UserIdNamePicture[]>(
          'http://auth_and_permissions:3000/api/auth/get-users-id-name-picture',
          {
            headers: {
              authorization,
            },
          },
        ),
      );

      userIdsNamesPictures = response.data; // accessing the data property here
    } catch {
      throw new BadRequestException('Error while fetching user data');
    }

    // get marks, format shall be like [{evaluator_id, order, number_value}]
    const marks = await this.markRepository.find({
      where: {
        survey_uuid: surveyUuid,
      },
      select: ['evaluator_id', 'order', 'number_value'], // specify fields to return
    });

    // get comments, format shall be like [{evaluator_id, text_value}]
    const comments = await this.commentRepository.find({
      where: {
        survey_uuid: surveyUuid,
      },
      select: ['evaluator_id', 'text_value'], // specify fields to return
    });

    // transform the marks and comments into maps for quick lookup
    const marksMap = marks.reduce(
      (acc, mark) => {
        if (!acc[mark.evaluator_id]) acc[mark.evaluator_id] = [];
        acc[mark.evaluator_id].push(mark.number_value);
        return acc;
      },
      {} as Record<string, number[]>,
    );

    const commentsMap = comments.reduce(
      (acc, comment) => {
        acc[comment.evaluator_id] = comment.text_value;
        return acc;
      },
      {} as Record<string, string>,
    );

    // combine everything into the UserEvaluation[] format and filter out users without evaluations
    const userEvaluations: UserEvaluation[] = userIdsNamesPictures
      .map((user) => ({
        ...user,
        marks: marksMap[user.id] || [], // default to empty array if no marks found
        comment: commentsMap[user.id] || '', // default to empty string if no comment found
      }))
      .filter((user) => user.marks.length > 0 || user.comment !== ''); // exclude users without evaluations

    return userEvaluations;
  }

  // for surveys survey view panel
  async getAverageMarksForSurveys(surveyUuids: string[]): Promise<{ [surveyUuid: string]: number[] }> {
    // Step 1: Fetch averages grouped by survey_uuid and order
    const rawResults = await this.markRepository
      .createQueryBuilder('mark')
      .select('mark.survey_uuid', 'survey_uuid')
      .addSelect('mark.order', 'order')
      .addSelect('AVG(mark.number_value)', 'average')
      .where('mark.survey_uuid IN (:...surveyUuids)', { surveyUuids })
      .groupBy('mark.survey_uuid')
      .addGroupBy('mark.order')
      .orderBy('mark.survey_uuid')
      .addOrderBy('mark.order')
      .getRawMany();

    // Step 2: Transform the result into the desired format
    const result: { [surveyUuid: string]: number[] } = {};

    rawResults.forEach((row) => {
      const surveyUuid = row.survey_uuid;
      const order = parseInt(row.order, 10);
      const average = parseFloat(row.average);

      if (!result[surveyUuid]) {
        result[surveyUuid] = [];
      }

      // Ensure the array is populated in the correct order
      result[surveyUuid][order] = average;
    });

    return result;
  }
}
