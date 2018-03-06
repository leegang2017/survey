import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage() {
  localStorage.clear();
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! clear!</h1>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
