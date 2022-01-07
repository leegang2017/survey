/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: string;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions;
}

export class ListPage<T> {
  count: number;
  page: number;
  pageSize: number;
  content: T[];
}

export class CreateUserDto {
  readonly name: string;
  readonly isMale: boolean;
  readonly role: string; //类型: OPERATOR,操作员,USER老人
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
