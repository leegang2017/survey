'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513146398741_4502';

  config.security = {
    ignore: '/api/',
    csrf: {
      enable: false,
      // ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    methodnoallow: {
      enable: false,
    },
  };
  // add your config here
  config.middleware = [];

  config.oAuth2Server = {
    grants: [ 'password', 'refresh_token' ],
    expiresIn: 3600,
  };  
  // add your config here
  config.mongoose = {
    // url: 'mongodb://192.168.0.111/survey',
    url: 'mongodb://127.0.0.1/survey',
    options: {
      useMongoClient: true,
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0
    },

  };

  config.onerror = {
    html(err, ctx) {
      ctx.logger.error(`error for href: ${ctx.href}, \n body: ${JSON.stringify(ctx.request.body)}` );
      // html hander
      ctx.body = '<h3>error</h3>';
      ctx.status = 500;
    },
    json(err, ctx) {
      ctx.logger.error(`error for href: ${ctx.href}, \n body: ${JSON.stringify(ctx.request.body)}` );
      // json hander
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
    jsonp(err, ctx) {
      // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
    },
  }
  config.default = {
    user:{password: '111'}
  };
  return config;
};
