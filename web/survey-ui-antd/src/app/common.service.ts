import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class StorageService {
  set(key: string, value) {
    return (<any>(<any>window)).localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    return JSON.parse((<any>window).localStorage.getItem(key));
  }

  remove(key: string) {
    return (<any>window).localStorage.removeItem(key);
  }
}


@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private storage: StorageService
  ) {
    let loginUser = storage.get("loginUser")
    if (loginUser) {
      this.loggedIn.next(true);
    }
  }

  login(){
    this.loggedIn.next(true);
  }

  logout(){
    this.loggedIn.next(false);
  }
}
