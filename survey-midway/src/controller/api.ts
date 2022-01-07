import {
  Inject,
  Controller,
  Post,
  Provide,
  Options,
} from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { Context } from 'egg';
import { AuthService } from '../service/authService';
import { UserService } from '../service/userService';

@Provide()
@Controller()
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  authService: AuthService;

  @Inject()
  jwt: JwtService;

  @Options('/**')
  getHello() {
    return null;
  }

  // @UseGuards(AuthGuard('local'))
  @Post('/auth/login', { middleware: ['local'] })
  async login() {
    console.log('this.ctx.req', this.ctx.req['user']);
    return this.authService.sign(this.ctx.req['user']);
  }

  @Post('/jwt')
  async genJwt() {
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }),
    };
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
