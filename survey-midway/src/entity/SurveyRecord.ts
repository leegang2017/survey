import { prop } from '@typegoose/typegoose';
import { EntityModel } from '@midwayjs/typegoose';

@EntityModel()
export class SurveyRecord {
  @prop()
  public target: object; //用户
  @prop()
  public name: string;
  @prop()
  public category: string;
  @prop()
  public code: string;
  @prop()
  public questions: object;
  @prop()
  public conclusions: object; //测试的所有结果
  @prop()
  public conclusion: object; //本次测试结果
  @prop()
  public status: string;
  @prop()
  public created: number;
  @prop()
  public updated: number;
}
