'use strict';
const api = '/api/v1';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.options('/**', controller.home.index);
  router.get(api + '/users/login', controller.users.login);
  router.post(api + '/users/search', controller.users.index);
  router.post(api + '/users/bulk', controller.users.bulk);
  router.resources('users', api + '/users', controller.users);
  
  router.post(api + '/surveys/search', controller.surveys.index);
  router.resources('surveys', api + '/surveys', controller.surveys);
  
  router.post(api + '/surveyRecords/search', controller.surveyRecords.index);
  router.get(api + '/surveyRecords/exportRecord', controller.surveyRecords.exportRecord);
  router.resources('surveyRecords', api + '/surveyRecords', controller.surveyRecords);
};
