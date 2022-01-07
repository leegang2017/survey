import { Provide } from '@midwayjs/decorator';
import { PassportMiddleware } from '@midwayjs/passport';
import passport = require('passport');
import { LocalStrategy } from '../strategy/local';

@Provide('local') // 此处可以使用一个简短的identifier
export class LocalPassportMiddleware extends PassportMiddleware(LocalStrategy) {
  // 设置 AuthenticateOptions
  getAuthenticateOptions():
    | Promise<passport.AuthenticateOptions>
    | passport.AuthenticateOptions {
    return {
      // failureRedirect: '/login',
      userProperty: 'user',
    };
  }
}
