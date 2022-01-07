import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1641212017021_4511';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // config.security = {
  //   csrf: false,
  // };
  // config.mongoose = {
  //   client: {
  //     uri: 'mongodb://survey:survey123@39.104.174.135:3308/surveydev',
  //   },
  // };
  return config;
};
export const mongoose = {
  client: {
    uri: 'mongodb://survey:survey123@39.104.174.135:3308/surveydev',
  },
};

export const cors = {
  origin: '*',
  // {string|Array} allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
};

export const jwt = {
  secret: 'secretKey', // fs.readFileSync('xxxxx.key')
  expiresIn: '2d', // https://github.com/vercel/ms
};
