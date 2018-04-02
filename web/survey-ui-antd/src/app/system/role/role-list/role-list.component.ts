import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import { RestService } from '../../../providers/rest.service';
import {RoleEditComponent} from "../role-edit/role-edit.component";
import { AuthService } from "../../../providers/common.service";
import { AppConfig } from "../../../app.config";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  _loading = false;
  _page:any = {
    page: 1,
    content: [],
  }
  _searchParams:any = {eqs:{system: this.config.system}};

  constructor(
    private _message: NzMessageService,
    private modalService: NzModalService,
    private config: AppConfig,
    private auth: AuthService,
    private rest: RestService) { }

  ngOnInit() {
    const loginUser = this.auth.getLoginUser();
    if (loginUser.organization) {
      this._searchParams.eqs['organization._id'] = loginUser.organization._id;
    } else {
      this._searchParams.eqs['organization'] = {$exists:false};
    }
    this.refreshData();
  }

  refreshData() {
    this._loading = true;
    this.rest.getRoles(this._searchParams, {page: this._page.page}).subscribe(results => {
      this._loading = false;
      this._page = results;
    }, (error) => {
      this._loading = false;
    })
  }

  gotoEdit(record) {
    // this.router.navigate(['system/role/edit', {data: JSON.stringify(record)} ]);
    const subscription = this.modalService.open({
      title: '编辑角色',
      content: RoleEditComponent,
      width: 720,

      onOk() {
      },
      onCancel() {

      },
      componentParams: {
        record
      },
      footer: false,
    });
    subscription.subscribe(result => {
      if (result['success']) {
        this.refreshData();
      }
    })
  }

}
