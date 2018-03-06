import React from 'react';
import { connect } from 'dva';
import styles from './SurveyManage.css';
import SurveyManageComponent from '../components/survey/SurveyManage';
function SurveyManage() {
  return (
    <div className={styles.normal}>
      <SurveyManageComponent />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(SurveyManage);
