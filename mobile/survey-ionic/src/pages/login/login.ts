import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {AuthService, ToastService, LoadService} from "../../app/providers/common.service";
import {RestService} from "../../app/providers/rest.service";
import {SurveyStartComponent} from "../survey-start/survey-start";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    loginUser = {phone: null, password: null};

    constructor(public navCtrl: NavController,
                private auth: AuthService,
                private rest: RestService,
                private load: LoadService,
                private toast: ToastService) {

    }

    login() {
        this.load.show();
        this.rest.login(this.loginUser.phone, this.loginUser.password).subscribe((result) => {
            if (result && result._id) {
                this.auth.login(result);
                this.navCtrl.setRoot(SurveyStartComponent)
            } else {
                this.toast.show('登录失败');
            }
            this.load.hide();
        }, (error) => {
            this.load.hide();
            this.toast.show('登录失败');
        });
    }
}
