import React, { Component } from 'react';
import { connect } from 'dva';
import { List, InputItem, WingBlank, WhiteSpace, Toast, Button, Picker } from 'antd-mobile';
import { routerRedux } from 'dva/router'
import { createForm } from 'rc-form';
import styles from './Login.css';

class LoginComponent extends Component {

  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("loginUser"));
    if (user) {
      this.props.dispatch(routerRedux.push('/surveyStart'));

      return;
    }

    this.state = {
      visible: false,
    };

  }

  state = {
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      let message = '';
      if (!value.name) {
        message = '请输入姓名!';
      }
      if (!value.identityNumber) {
        message = '请输入身份证号码!';
      }

      if (message != '') {
        Toast.info(message);
        return;
      }
      console.log(`${JSON.stringify(value)}`)
      this.props.dispatch({
        type: 'users/login',
        payload: value,
      });
    });
  }


  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <WingBlank size="lg">
        <div >
        <h2>知识竞答 <br/>  
        凝聚推动集团发展合力</h2>
        </div>
        <List style={{ paddingTop: 20 }}>

          <InputItem
            {...getFieldProps('name') }
            placeholder="姓名"
            clear
            className={styles.listLine}
          >姓名:</InputItem>
          <InputItem
            {...getFieldProps('identityNumber') }
            placeholder="身份证号码"
            clear
            className={styles.listLine}
          >身份证:</InputItem>
          <WhiteSpace />
          <List.Item>
            <Button type="primary" onClick={this.submit}>登录</Button>
          </List.Item>
        </List>
      </WingBlank>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  dispatch
});


export default connect(mapDispatchToProps)(createForm()(LoginComponent));;
