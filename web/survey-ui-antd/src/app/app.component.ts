import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { StorageService, AuthService } from './providers/common.service';
import { RestService } from './providers/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(
    private rest: RestService,
    private storage: StorageService,
    private authService: AuthService,
    private router: Router,
    private _message: NzMessageService) {

  }

  ngOnInit() {
    let loginUser = this.storage.get("loginUser");

    if (loginUser) {
        this.rest.getUserWithRoles(loginUser._id).subscribe(this.parseLogin, (error) => {
          this._message.info('登录失败');
        })
      return;
    }
  }

  parseLogin = (result)=> {
    if (result && result._id) {
      this.authService.login(result);
    } else {
      this.authService.logout();
      this._message.info('登录失败');
      this.router.navigate(['login']);
    }
  }
}
