import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DaoService } from 'src/common/daoService';
import { Survey } from './schemas/surveys.schema';

@Injectable()
export class SurveysService extends DaoService<Survey> {
  constructor(
    @InjectModel('surveys') private readonly surveyModel: Model<Survey>,
  ) {
    super(surveyModel);
  }
}
