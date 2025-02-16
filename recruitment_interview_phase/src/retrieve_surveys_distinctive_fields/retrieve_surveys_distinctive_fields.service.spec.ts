import { Test, TestingModule } from '@nestjs/testing';
import { RetrieveSurveysDistinctiveFieldsService } from './retrieve_surveys_distinctive_fields.service';

describe('RetrieveSurveysDistinctiveFieldsService', () => {
  let service: RetrieveSurveysDistinctiveFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetrieveSurveysDistinctiveFieldsService],
    }).compile();

    service = module.get<RetrieveSurveysDistinctiveFieldsService>(RetrieveSurveysDistinctiveFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
