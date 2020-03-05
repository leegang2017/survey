'use strict';

module.exports = appInfo => {
  const config = exports = {};
  
  config.mongoose = {
    // url: 'mongodb://127.0.0.1/survey',
    url: 'mongodb://survey:survey123@39.104.174.135:3308/surveydev?authMode=scram-sha1&rm.keepAlive=true&rm.tcpNoDelay=true&rm.nbChannelsPerNode=10',
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
      ctx.body = `<h3>error: ${JSON.stringify(err.stack)}</h3>`;
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

  return config;
};
