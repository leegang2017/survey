import React from 'react';
import { connect } from 'dva';
import styles from './SurveyStart.css';
import MainLayout from '../components/layout/MainLayout';
import SurveyStartComponent from '../components/survey/SurveyStart';

function SurveyStart() {
  return (
    <MainLayout>
      <div className={styles.normal}>
        <SurveyStartComponent />
      </div>
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(SurveyStart);
