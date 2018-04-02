import { Component, Input, OnInit } from "@angular/core";
import {
  NzMessageService,
  NzModalService,
  NzModalSubject
} from "ng-zorro-antd";
import { Observable, Subscriber } from "rxjs/Rx";
import { RestService } from "../../providers/rest.service";
import { Router } from "@angular/router";
import { AuthService, HelperService } from "../../providers/common.service";
import { AppConfig } from "../../app.config";
import { UserEditComponent } from "../user-edit/user-edit.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  _loading = false;
  _page: any = {
    page: 1,
    pageSize: 10,
    content: []
  };
  _nzPageSizeSelectorValues = [5, 10, 15, 20, 50];
  _searchParams: any = {
    eqs: { },
    likes: {},
    times: {}
  };
  district: any;
  times: any = { dobStart: null, dobEnd: null };
  loginUser;

  constructor(
    private modalService: NzModalService,
    private subject: NzModalSubject,
    private _message: NzMessageService,
    public auth: AuthService,
    private helper: HelperService,
    public config: AppConfig,
    private rest: RestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginUser = this.auth.getLoginUser();
    this.refreshData();
  }

  parseTimes() {
    this._searchParams.times = {};
    if (this.times.dobStart) {
      if (!this._searchParams.times.dob) {
        this._searchParams.times.dob = {};
      }
      this._searchParams.times.dob.start = this.helper.getDate(
        this.times.dobStart
      );
    }
    if (this.times.dobEnd) {
      if (!this._searchParams.times.dob) {
        this._searchParams.times.dob = {};
      }
      this._searchParams.times.dob.end = this.helper.getDate(this.times.dobEnd);
    }
  }

  clickSearch() {
    this._page.page = 1;
    this.refreshData();
  }
  
  refreshData() {
    this._loading = true;
    this.parseTimes();
    this.rest
      .getUsers(this._searchParams, {
        page: this._page.page,
        pageSize: this._page.pageSize
      })
      .subscribe(
        results => {
          this._loading = false;
          this._page = results;
        },
        error => {
          this._loading = false;
        }
      );
  }

  districtSelect(district) {
    this.district = district;
  }

  //删除
  _delete(id) {
    const subscription = this.modalService.confirm({
      title: "您是否确认要删除这项内容",
      content: "<b>删除后将不可恢复</b>",
      onOk() {},
      onCancel() {}
    });
    subscription.subscribe(result => {
      if (result == "onOk") {
        this.rest.deleteUser(id).subscribe(
          result => {
            if (result.ok) {
              this._message.info("删除成功");
              this.refreshData();
            }
          },
          error => {
            let message = '保存失败';
            if (error.error.message) {
              message = error.error.message;
            }
            this._message.error(message);
          }
        );
      }
    });
  }

  edit(record = null) {
    const subscription = this.modalService.open({
      title: "老人编辑",
      content: UserEditComponent,
      width: 840,
      onOk() {},
      onCancel() {
        console.log("Click cancel");
      },
      componentParams: {
        record
      },
      footer: false
    });
    subscription.subscribe(result => {
      if (result.success) {
        this.refreshData();
      }
    });
  }
}
