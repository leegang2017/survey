import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from "moment";
import { Observable } from 'rxjs/Rx';
import { StorageService, AuthService } from '../providers/common.service';

@Component({
  selector: 'app-home-header-layout',
  templateUrl: './home-layout.header.component.html',
  styleUrls: ['./home-layout.header.component.css']
})
export class HomeLayoutHeaderComponent implements OnInit {
  timemask = '';
  loginUser:any = {};
  constructor(private storage: StorageService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginUser = this.storage.get('loginUser');
  }

  ngOnInit() {
    Observable.interval(1000).subscribe(x => {
      this.timemask = moment().format('YYYY MMM Do dddd HH:mm:ss a');
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
