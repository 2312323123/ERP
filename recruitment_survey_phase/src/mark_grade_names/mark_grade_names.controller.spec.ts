import { Test, TestingModule } from '@nestjs/testing';
import { MarkGradeNamesController } from './mark_grade_names.controller';
import { MarkGradeNamesService } from './mark_grade_names.service';

describe('MarkGradeNamesController', () => {
  let controller: MarkGradeNamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarkGradeNamesController],
      providers: [MarkGradeNamesService],
    }).compile();

    controller = module.get<MarkGradeNamesController>(MarkGradeNamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
