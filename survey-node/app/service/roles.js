'use strict';
const DaoService = require('./daoService');

class RolesService extends DaoService {
  init() {
    this.model = this.ctx.model.Roles;
  }
}
module.exports = RolesService;
