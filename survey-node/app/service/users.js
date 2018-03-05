'use strict';
const DaoService = require('./daoService');

class UsersService extends DaoService {

  init() {
    this.model = this.ctx.model.Users;
      this.defaultPassword = this.app.config.default.user.password;
    }

    async create(user) {
      if (!user.password) {
        user.password = this.defaultPassword;
      }
      const md5Pass = this.ctx.helper.md5(user.password);
      user.password = md5Pass;
      user.status = 'NEW';
      return super.create(user);
    }

    async show(_id) {
      const user = await super.show(_id);
      return user;
    }

    async login(identityNumber, password) {
      const md5Pass = this.ctx.helper.md5(password);
      const queries = {
        identityNumber, password: md5Pass,
      };

      const user = await this.model.findOne(queries);
      return user;
    }
}
module.exports = UsersService;