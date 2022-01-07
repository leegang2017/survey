import {
  Inject,
  Controller,
  Post,
  Provide,
  Body,
  Param,
  Put,
  Get,
  ALL,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { CreateUserDto, ListPage } from '../interface';
import { UserService } from '../service/userService';

@Provide()
@Controller('/users')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post()
  async create(@Body(ALL) createuserDto: CreateUserDto) {
    const count = await this.userService.count({
      identityNumber: createuserDto.identityNumber,
    });
    if (count > 0) {
      throw new Error('身份证号码在系统已经存在');
    }

    return this.userService.create(createuserDto);
  }

  @Put('/:id')
  async update(@Param('id') id, @Body(ALL) createuserDto: CreateUserDto) {
    return this.userService.update(id, createuserDto);
  }

  @Post('/search')
  async index(@Body(ALL) body: any): Promise<ListPage<CreateUserDto>> {
    return this.userService.index(body);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('/profile', { middleware: ['jwt'] })
  async getProfile() {
    const user = await this.userService.show(this.ctx.req['user']._id);
    await this.userService.getRolesByUser(user);
    return user;
  }

  @Get('/getUserWithRoles/:id')
  async getUserWithRoles(@Param('id') id) {
    const user = await this.userService.show(id);
    await this.userService.getRolesByUser(user);
    return user;
  }
}
