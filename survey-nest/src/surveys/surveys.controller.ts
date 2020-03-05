import { Controller, Body, Post, Put, Param } from '@nestjs/common';
import { SurveysService } from './surveys.service';

@Controller('surveys')
export class SurveysController {
    constructor(
        private readonly surveysService: SurveysService,
        ) {}

    @Post('search')
    async index(@Body() body: any) {
        return this.surveysService.index(body);
    } 

    @Put(':id')
    async update(@Param('id') id,@Body() body: any) {
        return this.surveysService.update(id, body);
      }
}
