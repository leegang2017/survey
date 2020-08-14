export class CreateSurveyDto {
  readonly name: string;
  readonly category: string;
  readonly code: string;
  readonly questions: object;
  readonly conclusions: object;
  readonly status: string;
  readonly created: number;
  readonly updated: number;
}
