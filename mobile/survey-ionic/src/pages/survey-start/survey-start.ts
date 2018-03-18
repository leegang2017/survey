import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService, ToastService, LoadService, StorageService } from "../../app/providers/common.service";
import { RestService } from "../../app/providers/rest.service";
import {SurveyResultComponent} from "../survey-result/survey-result";
import {LoginPage} from "../../pages/login/login";

@Component({
  selector: 'app-survey-start',
  templateUrl: './survey-start.html',
})
export class SurveyStartComponent implements OnInit {
  letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
  survey: any = {}
  page: any = {
    pageIndex: 1,
    pageSize: 5,
    pageTotal: 0,
    pageTotalIndex: 0,
    content: [],
  }
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private storage: StorageService,
    private auth: AuthService,
    private rest: RestService,
    private load: LoadService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    const surveyed = this.storage.get('surveyed');
    if (surveyed) {
      this.toast.show('本台机器测试过了');
      this.navCtrl.push(SurveyResultComponent);
      return;
    }
    const loginUser = this.storage.get('loginUser');
    this.rest.getSurveyRecord(loginUser._id).subscribe(result => {
      if (result && result.count > 0) {
        this.toast.show('您已经测试过了');
        this.navCtrl.push(SurveyResultComponent);
        return;
      }
    });

    this.rest.getSurvey().subscribe(result => {
      if (result && result.count > 0) {
        this.survey = result.content[0];
        this.randomQuestion();
        this.page.pageTotal = this.survey.questions.length;
        this.page.pageTotalIndex = Math.ceil(this.page.pageTotal/this.page.pageSize);
        this.renderPage();
      } else {
        this.toast.show('获取题失败');
      }
    }, (error) => {
      this.toast.show('获取题失败');
    });
  }

  randomQuestion() {
    const allQuestions = this.survey.questions;
    let questions = [];
    let step = 5;
    const allCount = 50;
    while (questions.length < allCount && allQuestions.length > 0) {
      let start = Math.round(Math.random() * allQuestions.length)
      if (allCount - questions.length < step) {
        step = allCount - questions.length;
      }
      questions = questions.concat(allQuestions.splice(start, step));
    }
    this.survey.questions = questions
  }

  selectField(question, choice) {
    if (question.category == 'SINGLE') {
      question.choices.map(c => c.select = false);
      choice.select = true;
    } else {
      choice.select = !choice.select;
    }
  }

  saveSurvey() {
    let count = 0;
    const messages = [];
    for (let i = 0; i < this.survey.questions.length; i++) {
      const question = this.survey.questions[i];
      if (!question.choices.some(c => c.select == true)) {
        count++;
        messages.push(i + 1);
        if (count > 2) {
          break;
        }
      }
    }
    if (count > 0) {
      let message;
      if (count == 1) {
        message = `第${messages.join(',')}题没有做`
      } else {
        message = `第${messages.join(',')}等题没有做`
      }
      this.toast.show(message);
      return;
    }


    const score = this.survey.questions.map(question => {
      return question.choices.filter(c => c.select == true).map(c => c.score).reduce((a, b) => a + b, 0);
    }).reduce((a, b) => a + b, 0);
    const conclusion = this.survey.conclusions.find(c => {
      const start = c.region[0];
      const end = c.region[1];
      return start <= score && end >= score;
    })
    conclusion.score = score;
    this.survey.conclusion = conclusion;
    const loginUser = this.storage.get('loginUser')
    this.survey.target = loginUser;

    this.rest.saveSurveyRecord(this.survey).subscribe(result => {
      this.toast.show('保存成功');
      this.storage.set('surveyed', true);
      this.navCtrl.push(SurveyResultComponent);
    }, (error) => {
      this.toast.show('保存失败');
    });
  }

  changePage(pageIndex) {
    console.log(`changePage`)
    this.page.pageIndex = pageIndex;
    this.renderPage();
  }
  renderPage() {
    const start = (this.page.pageIndex - 1) * this.page.pageSize;
    const end = start + this.page.pageSize;
    this.page.content = this.survey.questions.slice(start, end);
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      message: '一台手机只能做一次题,确定要提交这个吗？',
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '同意',
          handler: () => {
            this.saveSurvey()
          }
        }
      ]
    });
    confirm.present();
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage)
  }
}
