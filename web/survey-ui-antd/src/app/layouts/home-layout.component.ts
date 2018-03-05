import { Component, OnInit } from '@angular/core';
import { StorageService } from '../common.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styles: []
})
export class HomeLayoutComponent implements OnInit {
  title = '';
  constructor(private storage: StorageService
  ) {

  }

  ngOnInit() {
    let loginUser = this.storage.get("loginUser");
    if (loginUser) {
      this.title = `欢迎您: ${loginUser.name}`
    }
  }
}
