'use strict';
const Controller = require('egg').Controller;

class CommonController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.init && this.init();
  }
  async index(ctx) {
    ctx.body = await this.daoService.index(ctx.query);
  }

  async show(ctx) {
    ctx.body = await this.daoService.show(ctx.params.id);
  }

  async update(ctx) {
    ctx.body = await this.daoService.update(ctx.params.id, ctx.request.body);
  }

  async create(ctx) {
    ctx.body = await this.daoService.create(ctx.request.body);
  }

  async destroy(ctx) {
    ctx.body = await this.daoService.destroy(ctx.params.id);
  }

  success(result) {
    this.ctx.body = {
      success: true,
      result,
    };
  }

  fail(message = undefined, status = 200) {
    this.ctx.status = status;
    this.ctx.body = {
      success: false,
      message,
    };
  }
};

module.exports = CommonController;