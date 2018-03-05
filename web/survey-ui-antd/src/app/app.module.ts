import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';

import { AppConfig } from './app.config';
import { RestService } from './rest.service';
import { SurveyStartComponent } from './survey-start/survey-start.component';
import { SurveyManageComponent } from './survey-manage/survey-manage.component';
import { NzModalSurveyChoicesEditComponent } from './nz-modal-survey-choices-edit/nz-modal-survey-choices-edit.component';
import { StorageService, AuthService } from './common.service';
import { SurveyResultComponent } from './survey-result/survey-result.component';
import { CleanComponent } from './clean/clean.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    LoginComponent,
    SurveyStartComponent,
    SurveyManageComponent,
    NzModalSurveyChoicesEditComponent,
    SurveyResultComponent,
    CleanComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    AppRoutingModule
  ],
  entryComponents: [
    NzModalSurveyChoicesEditComponent
  ],

  providers: [AppConfig, RestService, StorageService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
