import { Module } from '@nestjs/common';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveySchema } from './schemas/surveys.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'surveys', schema: SurveySchema }])],
  controllers: [SurveysController],
  providers: [SurveysService]
})
export class SurveysModule {}
