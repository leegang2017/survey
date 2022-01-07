import * as mongoose from 'mongoose';
const Mixed = mongoose.Schema.Types.Mixed;
export const UserSchema = new mongoose.Schema({
  name: String,
  isMale: Boolean,
  role: String, //类型: OPERATOR,操作员,USER老人
  roles: Mixed,
  phone: String,
  password: String,
  identityNumber: String,
  company: String,
  department: String,
  header: String,
  status: String,
  created: Number,
  updated: Number,
});

export interface User extends Document {
  readonly name: string;
  readonly isMale: boolean;
  readonly role: string; //类型: OPERATOR,操作员,USER老人
  readonly roles: object;
  readonly phone: string;
  readonly password: string;
  readonly identityNumber: string;
  readonly company: string;
  readonly department: string;
  readonly header: string;
  readonly status: string;
  readonly created: number;
  readonly updated: number;
}
