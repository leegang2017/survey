import React from 'react';
import { connect } from 'dva';
import styles from './SurveyResult.css';
import MainLayout from '../components/layout/MainLayout';
import SurveyResultComponent from '../components/survey/SurveyResult';
function SurveyResult() {
  return (
    <MainLayout>
      <div className={styles.normal}>
        <SurveyResultComponent />
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(SurveyResult);
