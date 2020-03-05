import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SurveysModule } from './surveys/surveys.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { SurveyRecordsModule } from './survey-records/survey-records.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://survey:survey123@39.104.174.135:3308/surveydev?authMode=scram-sha1&rm.keepAlive=true&rm.tcpNoDelay=true&rm.nbChannelsPerNode=10'),
  UsersModule,
  SurveysModule,
  AuthModule,
  RolesModule,
  SurveyRecordsModule],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
