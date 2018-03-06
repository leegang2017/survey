import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Login from "./routes/Login.js";

import SurveyStart from "./routes/SurveyStart.js";

import SurveyResult from "./routes/SurveyResult.js";

import SurveyManage from "./routes/SurveyManage.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/clear" component={IndexPage} />
        <Route path="/login" component={Login} />
        <Route path="/surveyStart" component={SurveyStart} />
        <Route path="/surveyResult" component={SurveyResult} />
        <Route path="/surveyManage" component={SurveyManage} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
