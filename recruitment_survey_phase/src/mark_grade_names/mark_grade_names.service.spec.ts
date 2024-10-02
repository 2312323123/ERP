import { Test, TestingModule } from '@nestjs/testing';
import { MarkGradeNamesService } from './mark_grade_names.service';

describe('MarkGradeNamesService', () => {
  let service: MarkGradeNamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkGradeNamesService],
    }).compile();

    service = module.get<MarkGradeNamesService>(MarkGradeNamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
