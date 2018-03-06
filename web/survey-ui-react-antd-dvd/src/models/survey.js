import * as restService from '../services/rest';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router'

const randomQuestion = (data) => {
  if (!data) {
    return;
  }
  const allQuestions = data.questions;
  let questions = [];
  let step = 5;
  const allCount = 50;
  while (questions.length < allCount && allQuestions.length > 0) {
    let start = Math.round(Math.random() * allQuestions.length)
    if (allCount - questions.length < step) {
      step = allCount - questions.length;
    }
    questions = questions.concat(allQuestions.splice(start, step));
  }
  data.questions = questions;
  return data;
}

export default {
  namespace: 'survey',
  state: {
    data: null
  },
  reducers: {
    show(state, { payload: { data } }) {
      return { ...state, data };
    },
  },
  effects: {

    *getSurveyAndRecord({ }, { call, put }) {
      console.log('getSurvey')
      const user = JSON.parse(localStorage.getItem("loginUser"));
      const surveyRecords = yield call(restService.getSurveyRecord, user._id);
      if (surveyRecords && surveyRecords.count > 0) {
        yield put(routerRedux.push('/surveyResult'))
        return;
      }
      const result = yield call(restService.getSurvey);
      if (result && result.count > 0) {
        const survey = result.content[0];
        yield put({
          type: 'show',
          payload: {
            data: randomQuestion(survey),
          },
        });
      } else {
        Toast.info('获取题失败');
      }
    },

    *getSurvey({ }, { call, put }) {
      console.log('getSurvey')
      const result = yield call(restService.getSurvey);
      if (result && result.count > 0) {
        const survey = result.content[0];
        yield put({
          type: 'show',
          payload: {
            data: survey,
          },
        });
      } else {
        Toast.info('获取题失败');
      }
    },
        
    *saveSurvey({ payload: survey }, { call, put }) {
      console.log('saveSurvey')
      const result = yield call(restService.updateSurvey, survey);
      if (result && result._id) {
        Toast.info('保存成功');
        return;
      } else {
        Toast.info('保存失败');
      }
    },
    *getSurveyRecord({ payload: { targetId } }, { call, put }) {
      console.log('getSurveyRecord')
      const result = yield call(restService.getSurveyRecord, targetId);
      if (result && result.count > 0) {
        const surveyRecord = result.content[0];
        yield put({
          type: 'show',
          payload: {
            data: surveyRecord,
          },
        });
      } else {
        Toast.info('获取题失败');
      }
    },
    
    *saveSurveyRecord({ payload: surveyRecord }, { call, put }) {
      console.log('saveSurveyRecord')
      const result = yield call(restService.saveSurveyRecord, surveyRecord);
      if (result && result._id) {
        yield put(routerRedux.push('/surveyResult'))
        return;
      } else {
        Toast.info('保存失败');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const user = JSON.parse(localStorage.getItem("loginUser"));
        if (pathname === '/surveyStart') {
          dispatch({ type: 'getSurveyAndRecord' });
        } else if (pathname === '/surveyResult' && user) {
          dispatch({
            type: 'getSurveyRecord', payload: {
              targetId: user._id,
            }
          });
        }
      });
    },
  },
};
