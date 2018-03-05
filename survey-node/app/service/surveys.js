'use strict';
const DaoService = require('./daoService');

class SurveysService extends DaoService {
    init() {
      this.model = this.ctx.model.Surveys;
    }
}
  module.exports =  SurveysService;
