import { ApiProperty } from '@nestjs/swagger';
export class ListPage<T> {
  @ApiProperty()
  count: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  content: T[];
}
