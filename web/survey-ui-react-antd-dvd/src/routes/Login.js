import React from 'react';
import { connect } from 'dva';
import styles from './Login.css';
import LoginComponent from '../components/login/Login';

function Login() {
  return (
    <div className={styles.normal} style={{ background: '#fff' }}>
      <LoginComponent />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Login);
