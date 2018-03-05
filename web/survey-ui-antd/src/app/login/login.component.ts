import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { StorageService, AuthService } from '../common.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  _isSpinning = false;

  constructor(private fb: FormBuilder, private rest: RestService,
    private storage: StorageService,
    private authService: AuthService,
    private router: Router,
    private _message: NzMessageService) {

  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.valid) {
      console.log('valid' + this.validateForm.value)
      this._isSpinning = true;
      this.rest.login(this.validateForm.value.phone, this.validateForm.value.password).subscribe(result => {
        if (result && result._id) {
          this._message.info('登录成功');
          this.storage.set('loginUser', result);
          this.authService.login();
          this.router.navigate(['survey/surveyStart']);
        } else {
          this._message.info('登录失败');
        }
        this._isSpinning = false;
      }, (error) => {
        this._isSpinning = false;
        this._message.info('登录失败');
      })
    }
  }


  ngOnInit() {
    this.validateForm = this.fb.group({
      phone: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    let loginUser = this.storage.get("loginUser");
    if (loginUser) {
      this.router.navigate(['survey/surveyStart']);
      return;
    }
  }

}
