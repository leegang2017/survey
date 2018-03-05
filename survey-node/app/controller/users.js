'use strict';
const CommonController = require('./commonController');

class UsersController extends CommonController {
	init() {
		this.daoService = this.service.users;
	}

	async login(ctx) {
		ctx.body = await this.daoService.login(ctx.query.phone, ctx.query.password);
	}
	async loginOld(ctx) {
		ctx.body = await this.daoService.login(ctx.query.phone, ctx.query.password);
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