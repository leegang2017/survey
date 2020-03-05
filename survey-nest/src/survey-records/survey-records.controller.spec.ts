import { Test, TestingModule } from '@nestjs/testing';
import { SurveyRecordsController } from './survey-records.controller';

describe('SurveyRecords Controller', () => {
  let controller: SurveyRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyRecordsController],
    }).compile();

    controller = module.get<SurveyRecordsController>(SurveyRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
