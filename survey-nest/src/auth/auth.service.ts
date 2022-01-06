import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(identityNumber, password) {
    const user = await this.usersService.login(identityNumber, password);
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
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }
}
