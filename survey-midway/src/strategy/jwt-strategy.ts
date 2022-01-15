import { Config } from '@midwayjs/decorator';
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Config('jwt')
  jwtConfig;

  async validate(payload) {
    console.log('JwtStrategy', payload);
    return payload;
  }

  getStrategyOptions(): any {
    return {
      secretOrKey: this.jwtConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  }
}
