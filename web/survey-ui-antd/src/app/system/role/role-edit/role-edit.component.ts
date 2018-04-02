import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzMessageService, NzModalSubject } from "ng-zorro-antd";
import { RestService } from "../../../providers/rest.service";
import { AuthService } from "../../../providers/common.service";
import { AppConfig } from "../../../app.config";

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  validateForm: FormGroup;
  _chooseRecord: any = { permission: [] };
  allChecked = {
    userManage: false,
    surveyManage: false,
    systemManage: false,
  };
  indeterminate = {
    userManage: false,
    surveyManage: false,
    systemManage: false,
  };
  _isSpinning;
  checkOptionsOne = {
    userManage: [
      { label: '人员信息', value: '人员信息', checked: false },
      { label: '人员信息编辑', value: '人员信息编辑', checked: false },
      { label: '人员信息删除', value: '人员信息删除', checked: false },
    ],
    surveyManage: [
      { label: '员工统计', value: '员工统计', checked: false },
      { label: '服务流水统计', value: '服务流水统计', checked: false },
    ],
    systemManage: [
      { label: '角色管理', value: '角色管理', checked: false },
      { label: '成员角色管理', value: '成员角色管理', checked: false },
    ],
  }
  _isValid = true;
  loginUser;

  set record(value: any) {
    if (value) {
      this._chooseRecord = value;
    }
  }

  constructor(
    private fb: FormBuilder,
    private rest: RestService,
    private subject: NzModalSubject,
    private _message: NzMessageService,
    private auth: AuthService,
    private config: AppConfig,
  ) { }

  ngOnInit() {
    this.loginUser = this.auth.getLoginUser();
    this.initRoles();
    this.parseRecordRoles();
    this.validateForm = this.fb.group({
      name: [this._chooseRecord.name, [Validators.required]],
    });
  }

  initRoles() {
    if (this.loginUser.role == 'ADMIN') {
      const adminSystemManage = [
        { label: '版本管理', value: '版本管理', checked: false },
        { label: '机构管理', value: '机构管理', checked: false },
        { label: '服务种类管理', value: '服务种类管理', checked: false },
        { label: '系统人员管理', value: '系统人员管理', checked: false },
      ]
      this.checkOptionsOne.systemManage = [...this.checkOptionsOne.systemManage, ...adminSystemManage];
    }
  }


  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.valid) {
      console.log('valid' + this.validateForm.value)
      if (!this._isValid) {
        this._message.error('角色名称已存在');
        return;
      }
      this._isSpinning = true;
      const record = { ...this._chooseRecord, ...this.validateForm.value, permission: this.getSelectRoles(), system: this.config.system, organization: this.loginUser.organization }
      this.rest.saveRoles(record).subscribe(result => {
        if (result && result._id) {
          this._message.info('保存成功');
          this.subject.next({ success: true });
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
      console.log('record', record)
    }
  }

  handleCancel(e) {
    this.subject.destroy('onCancel');
  }

  parseRecordRoles() {
    Object.values(this.checkOptionsOne).map(options => options.forEach(element => {
      element.checked = this._chooseRecord.permission.some(p => p == element.value)
    }));

    Object.keys(this.checkOptionsOne).forEach(key => this.updateSingleChecked(key));
  }

  getSelectRoles() {
    const allCheckedRoles = Object.entries(this.allChecked).filter(([k, v]) => v).map(([k, v]) => k);
    const indeterminateRoles = Object.entries(this.indeterminate).filter(([k, v]) => v).map(([k, v]) => k);
    const roles = Object.values(this.checkOptionsOne).map(options => options.filter(o => o.checked === true).map(o => o.value))
      .reduce((a, b) => [...a, ...b], []);
    return [...roles, ...indeterminateRoles, ...allCheckedRoles];
  }

  updateAllChecked(key) {
    this.indeterminate[key] = false;
    if (this.allChecked[key]) {
      this.checkOptionsOne[key].forEach(item => item.checked = true);
    } else {
      this.checkOptionsOne[key].forEach(item => item.checked = false);
    }
  }

  updateSingleChecked(key) {
    if (this.checkOptionsOne[key].every(item => item.checked === false)) {
      this.allChecked[key] = false;
      this.indeterminate[key] = false;
    } else if (this.checkOptionsOne[key].every(item => item.checked === true)) {
      this.allChecked[key] = true;
      this.indeterminate[key] = false;
    } else {
      this.indeterminate[key] = true;
    }
  }

  /**
   * 
   * @param event 到系统查询当前单位下角色名称是否存在
   */
  onChangeName(event) {
    const name = event.target.value;
    const nameValid = this.validateForm.controls.name;
    if (!nameValid.hasError('required')) {
      const loginUser = this.auth.getLoginUser();
      const _searchParams = { eqs: { name } };
      if (loginUser.organization) {
        _searchParams.eqs['organization._id'] = loginUser.organization._id;
      } else {
        _searchParams.eqs['organization'] = {$exists:false};
      }
      this.rest.getRoles(_searchParams, { page: 1, pageSize: 1 }).subscribe(results => {
        if (results.count > 0) {
          this._message.error('角色名称已存在');
          this._isValid = false;
        } else {
          this._isValid = true;
        }
      }, (error) => {
      })
    }
  }

}
