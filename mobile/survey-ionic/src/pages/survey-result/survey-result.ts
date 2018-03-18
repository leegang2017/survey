import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService, ToastService, StorageService } from "../../app/providers/common.service";
import { RestService } from "../../app/providers/rest.service";
import {LoginPage} from "../../pages/login/login";

@Component({
  selector: 'app-survey-result',
  templateUrl: './survey-result.html',
})
export class SurveyResultComponent implements OnInit {
  surveyRecord:any = {}
  letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z"];
  page: any = {
    pageIndex: 1,
    pageSize: 5,
    pageTotal: 0,
    pageTotalIndex: 0,
    content: [],
  }
  constructor(
    public navCtrl: NavController,
    private storage: StorageService,
    private auth: AuthService,
    private rest: RestService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    const surveyed = this.storage.get('surveyed');

    const loginUser = this.storage.get('loginUser');
    this.rest.getSurveyRecord(loginUser._id).subscribe(result => {
      if (result && result.count > 0) {
        this.surveyRecord = result.content[0];
        this.page.pageTotal = this.surveyRecord.questions.length;

        this.page.pageTotalIndex = Math.ceil(this.page.pageTotal/this.page.pageSize);
        this.renderPage();
      } else if (surveyed){
        this.toast.show('本台机器测试过了');
      }
    }, (error) => {
      this.toast.show('获取结果失败');
    });
  }

  changePage(pageIndex) {
    console.log(`changePage`)
    this.page.pageIndex = pageIndex;
    this.renderPage();
  }
  renderPage() {
    const start = (this.page.pageIndex-1)*this.page.pageSize;
    const end = start + this.page.pageSize;
    this.page.content = this.surveyRecord.questions.slice(start , end);
  }

  getRightAnswer(choices) {
    return choices.filter((c, i)=>{
      c.index = this.letters[i];
      return c.score!=0
    }).map(c=>c.index).join()
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage)
  }
}
