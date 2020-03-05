import { ApiExtraModels } from "@nestjs/swagger";

@ApiExtraModels()
export class CreateUserDto {
  readonly name: string;
  readonly isMale: boolean;
  readonly role: string;   //类型: OPERATOR,操作员,USER老人
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