'use strict';

// had enabled by egg
// exports.static = true;

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
exports.oAuth2Server = {
  enable: true,
  package: 'egg-oauth2-server',
};