import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService, NzModalSubject } from 'ng-zorro-antd';
import { RestService } from '../../../providers/rest.service';
import { AuthService } from "../../../providers/common.service";
import { AppConfig } from "../../../app.config";

@Component({
  selector: 'app-user-role-edit',
  templateUrl: './user-role-edit.component.html',
  styleUrls: ['./user-role-edit.component.css']
})
export class UserRoleEditComponent implements OnInit {
  _isSpinning = false;
  _chooseRecord: any = { roles: {} };
  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
  ];
  roles = [];
  loginUser;


  @Input()
  set record(value: any) {
    this._chooseRecord = value;
    if (!this._chooseRecord.roles) {
      this._chooseRecord.roles = {};
    }
  }
  constructor(
    private subject: NzModalSubject,
    private _message: NzMessageService,
    private rest: RestService,
    private auth: AuthService,
    private config: AppConfig,
  ) { }

  ngOnInit() {
    this.loginUser = this.auth.getLoginUser();
    const searchParams = { eqs: { system: this.config.system } };
    this._isSpinning = true;
    this.rest.getRoles(searchParams, { pageSize: 100 }).subscribe(results => {
      this._isSpinning = false;
      this.roles = results.content;
      this.parseRecordRoles();
    }, (error) => {
      this._isSpinning = false;
    })
  }

  parseRecordRoles() {
    const userRoles = this._chooseRecord.roles || {};
    let roleInSys = userRoles[this.config.system] || [];

    this.checkOptionsOne = this.roles.map(r => {
      const checked = roleInSys.some(p => p == r.name);
      return { label: r.name, value: r.name, checked }
    });

    this.updateSingleChecked();
  }

  getSelectRoles() {
    const roles = this.checkOptionsOne.filter(o => o.checked === true)
      .map(o => o.value);

    let result = this._chooseRecord.roles || {};
    if (!result[this.config.system]) {
      result[this.config.system] = {};
    }
    result[this.config.system]= roles;
    return result;
  }

  updateAllChecked() {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne.forEach(item => item.checked = true);
    } else {
      this.checkOptionsOne.forEach(item => item.checked = false);
    }
  }

  updateSingleChecked() {
    if (this.checkOptionsOne.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }


  handleCancel(e) {
    this.subject.destroy('onCancel');
  }

  emitDataOutside() {
    const roles = this.getSelectRoles();
    const record = { _id: this._chooseRecord._id, roles };
    this._chooseRecord.roles = roles;
    console.log('emitDataOutside', record);
    this.rest.saveUser(record).subscribe(result => {
      if (result && result._id) {
        this._message.info('保存成功');
        this.subject.destroy('onCancel');
      } else {
        this._message.info('保存失败');
      }
      this._isSpinning = false;
    }, (error) => {
      this._isSpinning = false;
      let message = '保存失败';
      if (error.error.message) {
        message = error.error.message;
      }
      this._message.error(message);
    })
  }

}
