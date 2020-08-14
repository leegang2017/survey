import { Module } from '@nestjs/common';
import { SurveyRecordsController } from './survey-records.controller';
import { SurveyRecordsService } from './survey-records.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveyRecordSchema } from './schemas/survey-records.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'surveyrecords', schema: SurveyRecordSchema },
    ]),
  ],
  controllers: [SurveyRecordsController],
  providers: [SurveyRecordsService],
})
export class SurveyRecordsModule {}
