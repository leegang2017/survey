import { Config, Inject } from '@midwayjs/decorator';
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { AuthService } from '../service/authService';
import { Strategy } from 'passport-local';

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Config('jwt')
  jwtConfig;

  @Inject()
  authService: AuthService;

  async validate(username, password) {
    console.log('validate', username, password);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new Error('401');
    }
    return user;

    // return {
    //   user,
    //   password,
    // };
  }

  // 当前策略的参数
  getStrategyOptions(): any {
    return {
      secretOrKey: this.jwtConfig.secret,
      passwordField: 'password',
    };
  }
}
