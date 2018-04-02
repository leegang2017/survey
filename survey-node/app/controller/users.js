'use strict';
const CommonController = require('./commonController');

class UsersController extends CommonController {
	init() {
		this.daoService = this.service.users;
	}

  async create(ctx) {
    const user = ctx.request.body;
    const count = await this.service.users.count({identityNumber: user.identityNumber});
    if (count > 0) {
      this.fail('身份证号码在系统已经存在', 417);
      return;
    }
    if (user.shortName) {
      const count = await this.service.users.count({shortName: user.shortName});
      if (count > 0) {
        this.fail('简称在系统已经存在', 417);
        return;
      }
    }

    await super.create(ctx);
  }
  async login(ctx) {
    const user = await this.service.users.login(ctx.query.phone, ctx.query.password);
    await this.getRolesByUser(user);
    ctx.body = user;
  }

  async getUserWithRoles(ctx) {
    const user = await await this.daoService.show(ctx.params.id);
    await this.getRolesByUser(user);
    ctx.body = user;
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
    const roles = await this.service.roles.find(searchParams);
    const results = roles.map(a => ({ [a.name]: a.permission })).reduce((a, b) => ({ ...a, ...b }), {});
    userRoles[system] = results;
  }

	async bulk(ctx) {
		const users = ctx.request.body;
		for (let i = 0; i < users.length; i++) {
			await this.daoService.create(users[i]);
		}
		this.success();
	}
};

module.exports = UsersController;