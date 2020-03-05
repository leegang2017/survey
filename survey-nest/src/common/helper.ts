import * as crypto from 'crypto';

const VALIDATOR = Symbol('Helpers#validator');

export const Helper  = {
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  md5(str:string) {
    const md5 = crypto.createHash('md5');
    return md5.update(str).digest('hex');
  },
  
  validator() {
    if (this[VALIDATOR]) {
      // 例如，从 header 中获取，实际情况肯定更复杂
      return this[VALIDATOR];
    }
    const validator = {
      toString (str) {
        if (str) {
          return str;
        }
        return "";
      },
      identityCodeValid(code) {
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(validator.toString(code)) === false) {
          return false;
        }
        return true;
      }
    }

    this[VALIDATOR] = validator;
    return this[VALIDATOR];
  },
}

