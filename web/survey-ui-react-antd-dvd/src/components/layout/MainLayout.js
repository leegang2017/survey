import React from 'react';
import styles from './MainLayout.css';
import { WingBlank } from 'antd-mobile';

function MainLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("loginUser"));
  return (
    <div className={styles.normal} style={{ background: '#fff' }}>
      <WingBlank size="lg">
        <h1> 欢迎您: {user.name} </h1>
      </WingBlank>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
