import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { SurveyRecordsService } from './survey-records.service';

@Controller('surveyRecords')
export class SurveyRecordsController {
    constructor(
        private readonly surveyRecordsService: SurveyRecordsService,
        ) {} 

    @Post('search')
    async index(@Body() body: any) {
        return this.surveyRecordsService.index(body);
    } 

    @Put(':id')
    async update(@Param('id') id,@Body() body: any) {
        return this.surveyRecordsService.update(id, body);
    }

    @Post()
    async create(@Body() body: any) {
        return this.surveyRecordsService.create(body);
    }
}
