import React, { Component } from 'react';
import { connect } from 'dva';
import { Pagination, List, Icon, InputItem, WingBlank, WhiteSpace, Toast, Button, Picker, Modal } from 'antd-mobile';
import { routerRedux } from 'dva/router'
import { createForm } from 'rc-form';
import { letters } from '../../constants';
import BackTop from '../backtop/BackTop';
import styles from './SurveyManage.css';

class SurveyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        questions: []
      }
    };

  }

  componentDidMount() {
    this.props.dispatch({ type: 'survey/getSurvey' });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  submit = () => {
    this.props.form.validateFields((error, value) => {
      const survey = this.state.data;
      console.log(`${JSON.stringify(survey)}`)
      this.props.dispatch({
        type: 'survey/saveSurvey',
        payload: survey,
      });
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const survey = this.state.data;
    const questions = survey.questions;
    return (
      <WingBlank size="lg">
        <List style={{ paddingTop: 20 }}>
          <InputItem
            {...getFieldProps('name', {
              initialValue: survey.name,
            }) }
            onChange={(v) => {
              survey.name = v
              this.forceUpdate();
            }}
            clear
            className={styles.listLine}
          >问卷名称:</InputItem>
        </List>
        <WhiteSpace />
        {questions.map((question, i) =>
          <List key={i}>
            <InputItem
              {...getFieldProps('questioncontent' + question.id, {
                initialValue: question.content,
              }) }
              clear
              onChange={(v) => {
                question.content = v
                this.forceUpdate();
              }}
              className={styles.listLine}
            >{i + 1}、题目</InputItem>
            <WhiteSpace />
            <Button inline onClick={this.showModal(`modal${i}`)}>选项</Button>
            <Button inline
              onClick={() => {
                questions.splice(i, 1);
                this.forceUpdate();
              }}><Icon type='cross' /></Button>

            <WhiteSpace />
            <Modal
              visible={this.state[`modal${i}`]}
              transparent
              maskClosable={false}
              onClose={this.onClose(`modal${i}`)}
              footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose(`modal${i}`)(); } }]}
            >
              {
                question.choices.map((choice, j) =>
                  <List key={`${i}-${j}`}>
                    <InputItem
                      {...getFieldProps(`choicecontent${j}`, {
                        initialValue: choice.content,
                      }) }
                      clear
                      onChange={(v) => {
                        choice.content = v
                        this.forceUpdate();
                      }}
                      className={styles.listLine}
                    >{letters[j]}</InputItem>
                    <InputItem
                      {...getFieldProps(`choicescore${j}`, {
                        initialValue: choice.score,
                      }) }
                      type="number"
                      clear
                      onChange={(v) => {
                        choice.score = Number.parseInt(v);
                        this.forceUpdate();
                      }}
                      className={styles.listLine}
                    >分数</InputItem>
                    <Button onClick={() => {
                      question.choices.splice(j, 1);
                      this.forceUpdate();
                    }} ><Icon type='cross' /></Button>
                  </List>

                )}
              <Button onClick={() => {
                const id = (question.choices.length > 0) ? question.choices[question.choices.length - 1].id + 1 : 0;

                const choice = {
                  id,
                  [`score${id}`]: undefined,
                  [`content${id}`]: undefined,
                };
                const index = question.choices.push(choice);
                this.forceUpdate();
              }} >+</Button>
            </Modal>
          </List>

        )}

        <Button onClick={() => {
          const id = (questions.length > 0) ? questions[questions.length - 1].id + 1 : 0;

          const control = {
            id,
            choices: [],
            [`content${id}`]: undefined,
            [`category${id}`]: 'SINGLE',
          };
          const index = questions.push(control);
          this.forceUpdate();
        }} >+</Button>
        <BackTop ref="backTopComponent" />

        <List.Item>
          <Button type="primary" onClick={this.submit}>保存</Button>
        </List.Item>
      </WingBlank>
    );
  }
}

function mapStateToProps(state) {
  const { data } = state.survey;
  return {
    data,
  };
}

export default connect(mapStateToProps)(createForm()(SurveyManage));;