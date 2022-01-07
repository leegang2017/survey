import * as mongoose from 'mongoose';

const Mixed = mongoose.Schema.Types.Mixed;

export const SurveyRecordSchema = new mongoose.Schema({
  target: Mixed, //用户
  name: String,
  category: String,
  code: String,
  questions: Mixed,
  conclusions: Mixed, //测试的所有结果
  conclusion: Mixed, //本次测试结果
  status: String,
  created: Number,
  updated: Number,
});

export interface SurveyRecord extends Document {
  readonly target: object; //用户
  readonly name: string;
  readonly category: string;
  readonly code: string;
  readonly questions: object;
  readonly conclusions: object; //测试的所有结果
  readonly conclusion: object; //本次测试结果
  readonly status: string;
  readonly created: number;
  readonly updated: number;
}

export class CreateSurveyRecordDto {
  readonly target: object; //用户
  readonly name: string;
  readonly category: string;
  readonly code: string;
  readonly questions: object;
  readonly conclusions: object; //测试的所有结果
  readonly conclusion: object; //本次测试结果
  readonly status: string;
  readonly created: number;
  readonly updated: number;
}
