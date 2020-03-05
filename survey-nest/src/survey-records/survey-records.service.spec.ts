import { Test, TestingModule } from '@nestjs/testing';
import { SurveyRecordsService } from './survey-records.service';

describe('SurveyRecordsService', () => {
  let service: SurveyRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyRecordsService],
    }).compile();

    service = module.get<SurveyRecordsService>(SurveyRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
