import React, { Component } from 'react';
import { Pagination, Icon, Button, Card, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { connect } from 'dva';
import styles from './SurveyStart.css';
import { letters } from '../../constants';
import BackTop from '../backtop/BackTop';

function SurveyStart({ dispatch, data }) {
  const page = {
    pageIndex: 1,
    pageSize: 10,
    pageTotal: 0,
    content: [],
  };
  if (!data) {
    data = { questions: [] }
  }

  const changePage = (pageIndex, backTop) => {
    console.log(`changePage`)
    page.pageIndex = pageIndex;
    renderPage();
  }
  const renderPage = () => {
    const start = (page.pageIndex - 1) * page.pageSize;
    const end = start + page.pageSize;
    page.pageTotal = Math.ceil(data.questions.length / page.pageSize);
    page.content = data.questions.slice(start, end);
  }

  renderPage();
  // randomQuestion();

  const saveSurvey = () => {
    const filters = data.questions.filter((question, index) => {
      question.index = index + 1;
      return !question.choices.some(c => c.select == true);
    }).reduce((a, b) => a + b, 0);
    let count = 0;
    const messages = [];
    for (let i = 0; i < data.questions.length; i++) {
      const question = data.questions[i];
      if (!question.choices.some(c => c.select == true)) {
        count++;
        messages.push(i + 1);
        if (count > 2) {
          break;
        }
      }
    }
    if (count > 0) {
      let message;
      if (count == 1) {
        message = `第${messages.join(',')}题没有做`
      } else {
        message = `第${messages.join(',')}等题没有做`
      }
      Toast.info(message);
      return;
    }


    const score = data.questions.map(question => {
      return question.choices.filter(c => c.select == true).map(c => c.score).reduce((a, b) => a + b, 0);
    }).reduce((a, b) => a + b, 0);
    const conclusion = data.conclusions.find(c => {
      const start = c.region[0];
      const end = c.region[1];
      return start <= score && end >= score;
    })
    conclusion.score = score;
    data.conclusion = conclusion;
    const user = JSON.parse(localStorage.getItem("loginUser"));
    data.target = user;

    dispatch({
      type: 'survey/saveSurveyRecord',
      payload: data,
    });

    // this.rest.saveSurveyRecord(data).subscribe(result => {
    //   Toast.info('保存成功');
    //   this.storage.set('surveyed', true);
    //   this.router.navigate(['survey/surveyResult']);
    // }, (error) => {
    //   Toast.info('保存失败');
    // });
  }

  return (
    <div>
      <SurveyStartComponent page={page} changePage={changePage} />
      <WhiteSpace />
      <Button type="primary" onClick={saveSurvey}>提交</Button>
    </div>
  );
}



class SurveyStartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  selectField(question, choice) {
    if (question.category == 'SINGLE') {
      question.choices.map(c => c.select = false);
      choice.select = true;
    } else {
      choice.select = !choice.select;
    }
    this.forceUpdate();
  }

  onChange = (pageIndex) => {
    this.props.changePage(pageIndex);
    this.refs['backTopComponent'].scrollToTop()
    this.forceUpdate();
  }


  render() {
    const page = this.props.page
    return (
      <WingBlank size="lg">
        {
          page.content.map((question, i) =>

            <Card key={i}>
              <Card.Header
                title={(page.pageIndex - 1) * page.pageSize + i + 1 + '、' + question.content}
              />
              <Card.Body>
                {
                  question.choices.map((choice, j) =>
                    <div key={`${i}-${j}`} className={`${styles.choice} ${choice.select ? styles.choiceSelected : ''}`} onClick={this.selectField.bind(this, question, choice)} >
                      {letters[j] + '、' + choice.content}</div>
                  )
                }

              </Card.Body>
              <Card.Footer />
            </Card>

          )
        }
        <BackTop ref="backTopComponent" />

        <Pagination total={page.pageTotal}
          className="custom-pagination-with-icon"
          current={page.pageIndex}
          onChange={this.onChange}
          locale={{
            prevText: (<span className="arrow-align"><Icon type="left" />上一步</span>),
            nextText: (<span className="arrow-align">下一步<Icon type="right" /></span>),
          }}
        />

      </WingBlank>
    )
  }
}

function mapStateToProps(state) {
  const { data } = state.survey;
  return {
    data,
  };
}

export default connect(mapStateToProps)(SurveyStart);