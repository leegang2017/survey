import * as mongoose from 'mongoose';

const Mixed = mongoose.Schema.Types.Mixed;

export const SurveySchema = new mongoose.Schema({
  name: String,
  category: String,
  code: String,
  questions: Mixed,
  conclusions: Mixed,
  status: String,
  created: Number,
  updated: Number,
});

export interface Survey extends Document {
  readonly name: string;
  readonly category: string;
  readonly code: string;
  readonly questions: object;
  readonly conclusions: object;
  readonly status: string;
  readonly created: number;
  readonly updated: number;
}
