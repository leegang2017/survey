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
import { SurveyRecordService } from '../service/surveyRecordService';

@Provide()
@Controller('/surveyRecords')
export class SurveyRecordController {
  @Inject()
  ctx: Context;

  @Inject()
  surveyRecordService: SurveyRecordService;

  @Post('/search')
  async index(@Body() body: any, @Query(ALL) query: any) {
    console.log('index');
    return this.surveyRecordService.index(body, query);
  }

  @Get('/:id')
  async get(@Param('id') id) {
    console.log('get', id);
    return this.surveyRecordService.findById(id);
  }
  @Put('/:id')
  async update(@Param('id') id, @Body(ALL) body: any) {
    return this.surveyRecordService.update(id, body);
  }

  @Post()
  async create(@Body(ALL) body: any) {
    return this.surveyRecordService.create(body);
  }
}
