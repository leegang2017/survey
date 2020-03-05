import { Controller, Request, Post, Body, Get, UseGuards, Param, ForbiddenException, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './schemas/users.dto';
import { User } from './schemas/users.schema';
import { ApiResponse } from '@nestjs/swagger';

class ListPage<T> {
  count:number;
  page:number;
  pageSize:number;
  content:T[];
}

class CreateUserDto2 {
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

@Controller('users')
export class UsersController {
    constructor(
      private readonly usersService: UsersService,
      
      ) {}

  @Post()
  async create(@Body() createuserDto: CreateUserDto) {
    const count = await this.usersService.count({identityNumber: createuserDto.identityNumber});
    if (count > 0) {
      throw new ForbiddenException('身份证号码在系统已经存在');
    }
    
    return this.usersService.create(createuserDto);
  }

  @Put(':id')
  async update(@Param('id') id,@Body() createuserDto: CreateUserDto) {
      return this.usersService.update(id, createuserDto);
    }

    // {
    //   count: 'number',
    //   page: 'number',
    //   pageSize: 'number',
    //   content: {
    //     type: 'array',
    //     items: {
    //       type: 'number',
    //     },
    //   },
    // }

  @Post('search')
  @ApiResponse({
      count: 'number',
      page: 'number',
      pageSize: 'number',

  })
  async index(@Body() body: any):Promise<ListPage<CreateUserDto>> {
      return this.usersService.index(body);
  } 

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.show(req.user._id);
    await this.usersService.getRolesByUser(user);
    return user;
  }

  @Get('getUserWithRoles/:id')
  async getUserWithRoles(
    @Param('id') id,) {
    const user = await this.usersService.show(id);
    await this.usersService.getRolesByUser(user);
    return user;
  }

}
