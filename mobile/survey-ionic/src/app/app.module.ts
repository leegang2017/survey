import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CoreModule } from './providers/core.module';
import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import {SurveyStartComponent} from "../pages/survey-start/survey-start";
import {SurveyResultComponent} from "../pages/survey-result/survey-result";


import { AppConfig } from './app.config';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SurveyStartComponent,
    SurveyResultComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SurveyStartComponent,
    SurveyResultComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppConfig,
  ]
})
export class AppModule {}
