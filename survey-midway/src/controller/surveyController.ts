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
import { SurveyService } from '../service/surveyService';

@Provide()
@Controller('/surveys')
export class SurveyController {
  @Inject()
  ctx: Context;

  @Inject()
  surveyService: SurveyService;

  @Post('/search')
  async index(@Body(ALL) body: any, @Query(ALL) query: any) {
    console.log('index');
    return this.surveyService.index(body, query);
  }

  @Get('/:id')
  async get(@Param('id') id) {
    console.log('get', id);
    return this.surveyService.findById(id);
  }
  @Put('/:id')
  async update(@Param('id') id, @Body(ALL) body: any) {
    return this.surveyService.update(id, body);
  }

  @Post()
  async create(@Body(ALL) body: any) {
    return this.surveyService.create(body);
  }
}
