'use strict';
const CommonController = require('./commonController');

class RolesController extends CommonController {
  init() {
    this.daoService = this.service.roles;
  }


  async update(ctx) {
    const oldRecord = await this.daoService.show(ctx.params.id);
    const updateParams = ctx.request.body;

    if (updateParams.name && updateParams.name != oldRecord.name) {
      const isExist = await this.daoService.count({ name: updateParams.name });
      if (isExist > 0) {
        this.fail('角色名称已存在', 417);
        return;
      }

      await this.service.users.updateMulti({ [`roles.${oldRecord.name}`]: oldRecord.name }, { $set: { [`roles.${oldRecord.name}`]: updateParams.name } });
      await this.service.users.updateMulti({ [`roles.${oldRecord.name}`]: updateParams.name }, { $rename: { [`roles.${oldRecord.name}`]: `roles.${updateParams.name}` } });
    }
    await super.update(ctx);
  }
}
module.exports = RolesController;
