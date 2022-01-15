import { Provide } from '@midwayjs/decorator';
import { PassportMiddleware } from '@midwayjs/passport';
import passport = require('passport');
import { JwtStrategy } from '../strategy/jwt-strategy';

@Provide('jwt')
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions():
    | Promise<passport.AuthenticateOptions>
    | passport.AuthenticateOptions {
    return {};
  }
}
