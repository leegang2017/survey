import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService, NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { RestService } from '../../../providers/rest.service';
import { UserRoleEditComponent } from '../user-role-edit/user-role-edit.component';
import { AuthService } from "../../../providers/common.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  _loading = false;
  _page: any = {
    page: 1,
    pageSize: 10,
    content: [],
  }
  _searchParams: any = {
    eqs: {

    }, likes: {}, "ins": {

    }
  };

  constructor(
    private modalService: NzModalService,
    private rest: RestService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    const loginUser = this.auth.getLoginUser();
    this.refreshData();
  }

  clickSearch() {
    this._page.page = 1;
    this.refreshData();
  }

  refreshData() {
    this._loading = true;
    this.rest.getUsers(this._searchParams, { page: this._page.page, pageSize: this._page.pageSize }).subscribe(results => {
      this._loading = false;
      this._page = results;
    }, (error) => {
      this._loading = false;
    })
  }

  //会员编辑
  gotoRolesEdit(record) {
    const subscription = this.modalService.open({
      title: '请选择成员角色',
      content: UserRoleEditComponent,
      width: 720,

      onOk() {
      },
      onCancel() {
        console.log('Click cancel');
      },
      componentParams: {
        record
      },
      footer: false,
    });
    subscription.subscribe(result => {
      console.log(JSON.stringify(result));
    })
  }

  _selectUser(data) {
  }

}
