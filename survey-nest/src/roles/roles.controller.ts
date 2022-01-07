import { Controller, Post, Body, Query, Put, Param } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('search')
  async index(@Body() body: any, @Query() query: any) {
    return this.rolesService.index(body, query);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() body: any) {
    return this.rolesService.update(id, body);
  }

  @Post()
  async create(@Body() body: any) {
    return this.rolesService.create(body);
  }
}
