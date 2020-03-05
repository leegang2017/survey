import * as mongoose from 'mongoose';

const Mixed = mongoose.Schema.Types.Mixed;
export const RoleSchema = new mongoose.Schema({
  name: String, // 角色名称
    permission: Mixed, // 权限
    system: String, // 那个系统
    organization: Mixed, // 机构
    created: Number,
    updated: Number,
});

export interface Role extends Document {
  readonly name: string; // 角色名称
  readonly permission: object; // 权限
  readonly system: string; // 那个系统
  readonly organization: object; // 机构
  readonly created: number;
  readonly updated: number;
}

export class CreateRoleDto {
  readonly name: string; // 角色名称
  readonly permission: object; // 权限
  readonly system: string; // 那个系统
  readonly organization: object; // 机构
  readonly created: number;
  readonly updated: number;
}