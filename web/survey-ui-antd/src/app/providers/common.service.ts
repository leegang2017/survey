import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';
import { NzMessageService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FileUploader } from 'ng2-file-upload';
import moment from "moment";
import { AppConfig } from '../app.config'


@Injectable()
export class HelperService {
  Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
      c = array[i++];
      switch (c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12: case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }

    return out;
  }

  getDate(date) {
    const d = moment(date);
    return moment({ hour: 0 }).year(d.year()).month(d.month()).date(d.date()).valueOf();
  }
}


@Injectable()
export class StorageService {
  set(key: string, value) {
    return (<any>window).localStorage.setItem(key, JSON.stringify(value));
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

  constructor(private storage: StorageService,
    private config: AppConfig,
  ) {
    let loginUser = storage.get("loginUser")
    if (loginUser) {
      this.loggedIn.next(true);
    }
  }

  login(user) {
    if ( user.roles && user.roles[this.config.system]) {
      user.totalRoles = Object.values(user.roles[this.config.system]).reduce((a, b) => ([...a, ...b]), []);
    } else {
      user.totalRoles = [];
    }
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

  hasPermission(p) {
    const loginUser = this.getLoginUser();
    return loginUser.totalRoles.includes(p);
  }

  getAuthorizationToken() {
    return this.storage.get("authorizationToken");
  }
}

@Injectable()
export class CompressImgService {
  dealImage(path, obj, callback) {
    const img = new Image();
    img.src = path;
    img.onload = function () {
      const that: any = this;
      // 默认按比例压缩
      let w = that.width,
        h = that.height,
        scale = w / h;
      if (obj.width && obj.width < w) {
        w = obj.width;
      }
      if (obj.height && obj.height < h) {
        h = obj.height;
      } else {
        h = w / scale;
      }
      // w = obj.width || w;
      // h = obj.height || (w / scale);
      let quality = 0.7;        // 默认图片质量为0.7

      //生成canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 创建属性节点
      const anw = document.createAttribute("width");
      anw.nodeValue = w;
      const anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);

      ctx.drawImage(that, 0, 0, w, h);
      // 图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality;
      }
      // quality值越小，所绘制出的图像越模糊
      const base64 = canvas.toDataURL('image/jpeg', quality);
      // 回调函数返回base64的值
      callback(base64);
    }
  }

  dataURItoBlob = function (dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mimeString });
  }

  getImg = function (fileDada) {
    const promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.dealImage(event.target.result, { width: 1280, height: 768, quality: 0.7 }, (base) => {
          resolve(this.dataURItoBlob(base));
        });
      }
      reader.readAsDataURL(fileDada);
    })
    return promise;
  }
}



@Injectable()
export class UploaderService {
  constructor(private config: AppConfig,
    private _message: NzMessageService,
    private compressImgService: CompressImgService,
  ) {
  }

  get() {
    const uploader = new FileUploader({ url: `${this.config.ServiceURI}file/upload` });
    uploader.onAfterAddingFile = (file: any) => { file.withCredentials = false; };
    return uploader;
  }

  getImageUploader() {
    const filters = [{
      name: 'customFilter',
      fn: function (item /*{File|FileLikeObject}*/, options) {
        var reg = /.*?\.(jpg|png)$/;
        return item.name.match(reg) != null;
      }
    }]
    const uploader = new FileUploader({ url: `${this.config.ServiceURI}file/upload`, filters });
    uploader.onWhenAddingFileFailed = (item /*{File|FileLikeObject}*/, filter, options) => {
      this._message.info('不支持的文件类型,只支持jpg和png格式的文件');
    };
    uploader.onAfterAddingFile = (fileItem) => {
      console.info('onAfterAddingFile', fileItem);
      fileItem.withCredentials = false;
      this.compressImgService.getImg(fileItem._file).then((dada: File) => {
        fileItem._file = dada;
      })
    };
    return uploader;
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


