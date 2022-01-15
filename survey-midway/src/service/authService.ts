import { Inject, Provide } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { UserService } from './userService';

@Provide()
export class AuthService {
  @Inject()
  userService: UserService;

  @Inject()
  jwtService: JwtService;

  async validateUser(identityNumber, password) {
    const user = await this.userService.login(identityNumber, password);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async sign(user: any) {
    const payload = {
      name: user.name,
      identityNumber: user.identityNumber,
      _id: user._id,
    };
    console.log('sign', payload);
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
