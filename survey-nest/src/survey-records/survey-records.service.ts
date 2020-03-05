import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DaoService } from 'src/common/daoService';
import { SurveyRecord } from './schemas/survey-records.schema';

@Injectable()
export class SurveyRecordsService  extends DaoService<SurveyRecord>{
    constructor(@InjectModel('surveyrecords') private readonly surveyModel: Model<SurveyRecord>) { 
        super(surveyModel);
    }


}
