import { prop } from '@typegoose/typegoose';
import { EntityModel } from '@midwayjs/typegoose';

@EntityModel()
export class Survey {
  @prop()
  public name: string;
  @prop()
  public category: string;
  @prop()
  public code: string;
  @prop()
  public questions: object;
  @prop()
  public conclusions: object;
  @prop()
  public status: string;
  @prop()
  public created: number;
  @prop()
  public updated: number;
}
