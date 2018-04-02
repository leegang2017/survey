import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class ValidateService {


  constructor(private _message: NzMessageService) {
  }

  check(msg) {
    if (msg) {
      this._message.warning(msg);
      return false;
    }
    return true;
  }

  toString(str) {
    if (str) {
      return str;
    }
    return "";
  }

  isCharNumber(temp, min, max) {
    if (!min) {
      min = 1;
    }
    var length;
    if (!max) {
      length = "{" + min + "}";
    } else if (max == '+') {
      length = "{" + min + ",}";
    } else {
      length = "{" + min + "," + max + "}";
    }
    var pattern = new RegExp("^([a-zA-Z0-9])" + length + "$");
    if (!pattern.test(this.toString(temp))) {
      return false;
    }
    return true;
  }

  isChinese (temp) {
    var re = /^[\u4E00-\u9FA5]+$/;
    if (re.test(this.toString(temp))) return true;
    return false;
  }

  isChineseCharNumber = function (temp) {
    var re = /^[a-zA-Z0-9\u4E00-\u9FA5]+$/;
    if (re.test(this.toString(temp))) return true;
    return false;
  }

  identityCodeValid = function (code) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(this.toString(code)) === false) {
      return false;
    }
    return true;
  }
  getIdentityCodeReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

  phone (phoneNum) {
    var msg = undefined;
    //手机号码验证
    var phoneReg = /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
    if (!phoneReg.test(this.toString(phoneNum))) {
      msg = "手机号码不正确，请重新输入！";
    }
    return this.check(msg);
  }

}
