'use strict';
const api = '/api/v1';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.options('/**', controller.home.index);
  router.post(api + '/oauth2/token', app.oAuth2Server.token());
  router.get(api + '/users/login', controller.users.login);
  router.get(api + '/auth/users/login',app.oAuth2Server.authenticate(),  controller.users.login);
  router.post(api + '/users/search', controller.users.index);
  router.get(api + '/users/getUserWithRoles/:id', controller.users.getUserWithRoles);
  router.get(api + '/users/login', controller.users.login);
  router.post(api + '/users/bulk', controller.users.bulk);
  router.resources('users', api + '/users', controller.users);
  
  router.post(api + '/surveys/search', controller.surveys.index);
  router.resources('surveys', api + '/surveys', controller.surveys);
  
  router.post(api + '/surveyRecords/search', controller.surveyRecords.index);
  router.get(api + '/surveyRecords/exportRecord', controller.surveyRecords.exportRecord);
  router.resources('surveyRecords', api + '/surveyRecords', controller.surveyRecords);
  // 角色
  router.post(api + '/roles/search', controller.roles.index);
  router.resources('roles', api + '/roles', controller.roles);
};
