import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { DaoService } from './daoService';
import { SurveyRecord } from '../entity/SurveyRecord';

@Provide()
export class SurveyRecordService extends DaoService {
  @InjectEntityModel(SurveyRecord)
  model: ReturnModelType<typeof SurveyRecord>;
}
