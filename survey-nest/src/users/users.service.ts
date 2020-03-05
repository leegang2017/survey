import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Helper } from '../common/helper';
import { User } from './schemas/users.schema';
import { DaoService } from 'src/common/daoService';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService extends DaoService<User>{
  constructor(
    @InjectModel('users') private readonly userModel: Model<User>,
    private readonly rolesService: RolesService,
    ) { 
    super(userModel);
  }


  async login(identityNumber, password): Promise<User> {
    const md5Pass = Helper.md5(password);
    const queries = {
      identityNumber, password: md5Pass,
    };

    const user = await this.userModel.findOne(queries).lean();
    return user;
  }


  async getRolesByUser(user) {
    if (user && user.roles) {
      const allPromise = Object.keys(user.roles).map(async s=> {
        await this.getRolesBySystem(user.roles, s);
      });
      await Promise.all(allPromise);
    }
  }

  async getRolesBySystem(userRoles, system) {
    const searchParams = {system, name: {$in: userRoles[system]}};
    const roles = await this.rolesService.find(searchParams);
    const results = roles.map(a => ({ [a.name]: a.permission })).reduce((a, b) => ({ ...a, ...b }), {});
    userRoles[system] = results;
  }
}
