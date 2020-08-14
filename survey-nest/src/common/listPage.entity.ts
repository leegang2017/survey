import { ApiProperty } from '@nestjs/swagger';

// @ApiProperty()
// count:number;
// @ApiProperty()
// page:number;
// @ApiProperty()
// pageSize:number;
// @ApiProperty({type: [T] })
// content:T[];

export const ListPage = () => {
  return class {
    @ApiProperty()
    count: number;
    @ApiProperty()
    page: number;
    @ApiProperty()
    pageSize: number;
    @ApiProperty({ type: [T] })
    content: T[];
  };
};
