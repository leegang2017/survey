import { prop } from '@typegoose/typegoose';
import { EntityModel } from '@midwayjs/typegoose';

@EntityModel()
export class Role {
  @prop()
  public name: string; // 角色名称
  @prop()
  public permission: object; // 权限
  @prop()
  public system: string; // 那个系统
  @prop()
  public organization: object; // 机构
  @prop()
  public created: number;
  @prop()
  public updated: number;
}
