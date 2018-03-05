import { Component, OnInit } from '@angular/core';
import { StorageService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clean',
  templateUrl: './clean.component.html',
  styleUrls: ['./clean.component.css']
})
export class CleanComponent implements OnInit {

  constructor(private storage: StorageService,
    private router: Router,) { }

  ngOnInit() {
    this.storage.remove('loginUser');
    this.storage.remove('surveyed');
    this.router.navigate(['login']);
  }

}
