import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {LoadingController, ToastController} from "ionic-angular";
import moment from "moment";
import { AppConfig } from '../app.config' 

@Injectable()
export class HelperService {
  getDate(date) {
    const d = moment(date);
    return moment({ hour: 0 }).year(d.year()).month(d.month()).date(d.date()).valueOf();
  }
}


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

  constructor(
    private storage: StorageService,
    private config: AppConfig,
  ) {
    let loginUser = storage.get("loginUser")
    if (loginUser) {
      this.loggedIn.next(true);
    }
  }

  login(user) {
    this.storage.set('loginUser', user);
    this.loggedIn.next(true);
  }

  logout() {
    this.storage.remove('loginUser');
    this.storage.remove('authorizationToken');
    this.loggedIn.next(false);
  }

  getLoginUser() {
    return this.storage.get("loginUser");
  }

  getAuthorizationToken() {
    return this.storage.get("authorizationToken");
  }
}



@Injectable()
export class WebsocketService {
  private ws: WebSocket;

  createObservableSocket(url: string, openSubscriber: Subscriber<any>): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(observer => {
      this.ws.onmessage = event => observer.next(event.data);
      this.ws.onerror = event => observer.error(event);
      this.ws.onclose = event => observer.complete();
      this.ws.onopen = event => {
        openSubscriber.next();
        openSubscriber.complete();
      };

      return () => this.ws.close();
    });
  }

  send(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}


@Injectable()
export class ToastService {
    constructor(public toastCtrl: ToastController) {
    }

    show(msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000
        });

        toast.present();
    }
}


@Injectable()
export class LoadService {
    loader;

    constructor(public loadingCtrl: LoadingController) {
    }

    hide() {
        if (this.loader) {
            this.loader.dismiss();
        }
    }

    show(message?) {
        this.loader = this.loadingCtrl.create(message);
        this.loader.present();
    }

    setContent(content) {
        this.loader.setContent(content);
    }
}