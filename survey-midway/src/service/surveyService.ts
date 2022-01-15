import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { DaoService } from './daoService';
import { Survey } from '../entity/Survey';

@Provide()
export class SurveyService extends DaoService {
  @InjectEntityModel(Survey)
  model: ReturnModelType<typeof Survey>;
}
