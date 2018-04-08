import { Component, OnInit, Input } from "@angular/core";
import { RestService } from "../../providers/rest.service";
import { AuthService } from "../../providers/common.service";
import { AppConfig } from "../../app.config";
import {
  NzMessageService,
  NzModalService,
  NzModalSubject
} from "ng-zorro-antd";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import moment from "moment";
import { ValidateService } from "../../providers/validate.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"]
})
export class UserEditComponent implements OnInit {
  validateForm: FormGroup;
  _isSpinning = false;
  _chooseRecord: any = {
  };
  isValid = true;

  @Input()
  set record(value: any) {
    if (value) {
      this._chooseRecord = value;
    }
  }

  constructor(
    private fb: FormBuilder,
    private subject: NzModalSubject,
    private _message: NzMessageService,
    private auth: AuthService,
    public config: AppConfig,
    private validateService: ValidateService,
    private modalService: NzModalService,
    private rest: RestService
  ) { }

  ngOnInit() {

    this.validateForm = this.fb.group({
      name: [this._chooseRecord.name, [Validators.required]],
      shortName: [this._chooseRecord.shortName, [Validators.required]],
      isMale: [this._chooseRecord.isMale, [Validators.required]],
      dob: [this._chooseRecord.dob, [Validators.required]],
      phone: [this._chooseRecord.phone, [Validators.required]],
      identityNumber: [
        this._chooseRecord.identityNumber,
        [
          Validators.required,
          Validators.pattern(this.validateService.getIdentityCodeReg)
        ]
      ],
    });

  }

  emitDataOutside() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.valid) {
      console.log("valid" + JSON.stringify(this.validateForm.value));
      if (!this.isValid) {
        this._message.error("身份证已在系统注册");
        return;
      }
      this._isSpinning = true;
      this.saveMember();
    }
  }

  saveMember() {
    // this._chooseRecord.name = this.validateForm.value.name;
    // this._chooseRecord.shortName = this.validateForm.value.shortName;
    // this._chooseRecord.isMale = this.validateForm.value.isMale;
    // this._chooseRecord.identityNumber = this.validateForm.value.identityNumber;
    // this._chooseRecord.dob = this.validateForm.value.dob;

    const record = {...this._chooseRecord, ...this.validateForm.value};

    this.rest.saveUser(record).subscribe(
      result => {
        if (result && result._id) {
          this._message.info("保存成功");
          this.subject.next({ success: true });
          this.subject.destroy("onCancel");
        } else {
          this._message.info("保存失败");
        }
        this._isSpinning = false;
      },
      error => {
        this._isSpinning = false;
        this._message.info("保存失败");
      }
    );
  }

  getSex(idNo) {
    if (idNo.length == 15) {
      return idNo.charAt(14) % 2 == 1;
    } else {
      return idNo.charAt(16) % 2 == 1;
    }
  }

  getDob(idNo) {
    let tmpStr = "";
    if (idNo.length == 15) {
      tmpStr = idNo.substring(6, 12);
      tmpStr = "19" + tmpStr;
    } else {
      tmpStr = idNo.substring(6, 14);
    }
    return moment(tmpStr).valueOf();
  }

  onChangeIdentityNumber(event) {
    const identityNumber = event.target.value;
    console.log("onChangeIdentityNumber", identityNumber);
    const identityNumberValid = this.validateForm.controls.identityNumber;
    if (
      !identityNumberValid.hasError("required") &&
      !identityNumberValid.hasError("pattern")
    ) {
      const sex = this.getSex(identityNumber);
      const dob = this.getDob(identityNumber);
      this.validateForm.patchValue({
        sex
      });
      this.validateForm.patchValue({
        dob
      });
      this.rest
        .getUsers({ eqs: { identityNumber } }, { page: 1, pageSize: 1 })
        .subscribe(
          results => {
            if (results.count > 0) {
              this._message.error("身份证已在系统注册");
              this.isValid = false;
            } else {
              this.isValid = true;
            }
          },
          error => { }
        );
    }
  }

  handleCancel(e) {
    this.subject.destroy("onCancel");
  }

}
