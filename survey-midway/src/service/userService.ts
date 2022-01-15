import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../entity/User';
import { Helper } from '../util/helper';
import { DaoService } from './daoService';
import { RoleService } from './roleService';

@Provide()
export class UserService extends DaoService {
  @InjectEntityModel(User)
  model: ReturnModelType<typeof User>;

  @Inject()
  roleService: RoleService;

  async login(identityNumber, password): Promise<User> {
    const md5Pass = Helper.md5(password);
    const queries = {
      identityNumber,
      password: md5Pass,
    };

    const user = await this.model.findOne(queries).lean();
    return user;
  }

  async getRolesByUser(user) {
    if (user && user.roles) {
      const allPromise = Object.keys(user.roles).map(async s => {
        await this.getRolesBySystem(user.roles, s);
      });
      await Promise.all(allPromise);
    }
  }

  async getRolesBySystem(userRoles, system) {
    const searchParams = { system, name: { $in: userRoles[system] } };
    const roles = await this.roleService.find(searchParams);
    const results = roles
      .map(a => ({ [a.name]: a.permission }))
      .reduce((a, b) => ({ ...a, ...b }), {});
    userRoles[system] = results;
  }
}
