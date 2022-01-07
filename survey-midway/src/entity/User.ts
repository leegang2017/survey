import { prop } from '@typegoose/typegoose';
import { EntityModel } from '@midwayjs/typegoose';

@EntityModel()
export class User {
  @prop()
  public name: string;
  @prop()
  public isMale: boolean;
  @prop()
  public role: string; //类型: OPERATOR,操作员,USER老人
  @prop()
  public roles: object;
  @prop()
  public phone: string;
  @prop()
  public password: string;
  @prop()
  public identityNumber: string;
  @prop()
  public company: string;
  @prop()
  public department: string;
  @prop()
  public header: string;
  @prop()
  public status: string;
  @prop()
  public created: number;
  @prop()
  public updated: number;
}
