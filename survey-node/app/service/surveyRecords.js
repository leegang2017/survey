'use strict';
const DaoService = require('./daoService');

class SurveyRecordsService extends DaoService {
    init() {
      this.model = this.ctx.model.SurveyRecords;
    }
}
  module.exports =  SurveyRecordsService;
