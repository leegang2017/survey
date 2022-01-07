import {
  Inject,
  Controller,
  Post,
  Provide,
  Query,
  Body,
  Param,
  Put,
  Get,
  ALL,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { RoleService } from '../service/roleService';

@Provide()
@Controller('/roles')
export class RoleController {
  @Inject()
  ctx: Context;

  @Inject()
  roleService: RoleService;

  @Post('/search')
  async index(@Body(ALL) body: any, @Query(ALL) query: any) {
    console.log('index', body, query);
    return this.roleService.index(body, query);
  }

  @Get('/:id')
  async get(@Param('id') id) {
    console.log('get', id);
    return this.roleService.findById(id);
  }
  @Put('/:id')
  async update(@Param('id') id, @Body(ALL) body: any) {
    return this.roleService.update(id, body);
  }

  @Post()
  async create(@Body(ALL) body: any) {
    return this.roleService.create(body);
  }
}
