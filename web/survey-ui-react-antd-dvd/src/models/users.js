import * as restService from '../services/rest';
import { routerRedux } from 'dva/router'
import { Toast } from 'antd-mobile';

export default {
  namespace: 'users',
  state: {},
  reducers: {},
  effects: {
    *login({ payload:{ name, identityNumber } }, { call, put }) {
      const results = yield call(restService.searchUser, {  name, identityNumber });
      if (results.count > 0) {
        Toast.info('登录成功');
        const user = results.content[0]
        localStorage.setItem("loginUser", JSON.stringify(user));
        yield put(routerRedux.push('/surveyStart'))
        // this.storage.set('loginUser', user);
        // this.authService.login();
        // this.router.navigate(['survey/surveyStart']);
      } else {
        Toast.info('登录失败');
      }
    },
  },
  subscriptions: {},
};
