import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../providers/rest.service';
import { NzMessageService } from 'ng-zorro-antd';
import { StorageService } from '../../providers/common.service';

@Component({
  selector: 'app-survey-result',
  templateUrl: './survey-result.component.html',
  styleUrls: ['./survey-result.component.css']
})
export class SurveyResultComponent implements OnInit {
  surveyRecord:any = {}
  letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z"];
  page: any = {
    pageIndex: 1,
    pageSize: 10,
    pageTotal: 0,
    content: [],
  }
  constructor(private rest: RestService,
    private router: Router,
    private storage: StorageService,
    private _message: NzMessageService) { }

  ngOnInit() {
    const surveyed = this.storage.get('surveyed');

    const loginUser = this.storage.get('loginUser');
    this.rest.getSurveyRecord(loginUser._id).subscribe(result => {
      if (result && result.count > 0) {
        this.surveyRecord = result.content[0];
        this.page.pageTotal = this.surveyRecord.questions.length;
        this.renderPage();
      } else if (surveyed){
        this._message.info('本台机器测试过了');
      }
    }, (error) => {
      this._message.info('获取结果失败');
    });
  }

  changePage(pageIndex, backTop) {
    console.log(`changePage`)
    this.page.pageIndex = pageIndex;
    this.renderPage();
    backTop.clickBackTop();
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
}
