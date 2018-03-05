'use strict';
const CommonController = require('./commonController');

class SurveysController extends CommonController {
	init() {
		this.daoService = this.service.surveys;
	}
};
module.exports = SurveysController;
