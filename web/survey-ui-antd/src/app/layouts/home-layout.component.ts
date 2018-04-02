import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../providers/common.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']

})
export class HomeLayoutComponent implements OnInit {
  title = '';
  constructor(private storage: StorageService,
    private router: Router,
  ) {
    let loginUser = this.storage.get("loginUser");
    if (loginUser) {
      this.title = `欢迎您: ${loginUser.name}`
    } else {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {

  }
}
