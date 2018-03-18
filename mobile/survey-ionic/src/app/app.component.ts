import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthService} from "./providers/common.service";
import {LoginPage} from "../pages/login/login";
import {SurveyStartComponent} from "../pages/survey-start/survey-start";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    auth: AuthService,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    let loginUser = auth.getLoginUser();
    if (loginUser) {
      this.rootPage = SurveyStartComponent;
    } else {
      this.rootPage = LoginPage;
    }
  }
}

