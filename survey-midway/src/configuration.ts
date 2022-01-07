import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as typegoose from '@midwayjs/typegoose';
import * as jwt from '@midwayjs/jwt';
import * as passport from '@midwayjs/passport';

@Configuration({
  imports: [
    typegoose, // 加载 typegoose 组件
    jwt,
    passport,
  ],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {}
}
