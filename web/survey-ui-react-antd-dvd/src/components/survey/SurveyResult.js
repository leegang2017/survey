import React, { Component } from 'react';
import styles from './SurveyResult.css';
import { Pagination, Icon, Button, Card, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { connect } from 'dva';
import { letters } from '../../constants';
import BackTop from '../backtop/BackTop';

function SurveyResult({ dispatch, data }) {
  const page = {
    pageIndex: 1,
    pageSize: 10,
    pageTotal: 0,
    content: [],
  };
  if (!data) {
    data = { questions: [], conclusion: {} }
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

  return (
    <div>
      <WingBlank size="lg">
        <Card>
          <Card.Header
            title={<div>得分:<span className={styles.score} >{data.conclusion.score * 2}</span></div>}
          />
          <Card.Body>
            {
              data.conclusion.content
            }

          </Card.Body>
          <Card.Footer />
        </Card>
      </WingBlank>
      <WhiteSpace />
      <SurveyResultComponent page={page} changePage={changePage} />
      <WhiteSpace />
    </div>
  );
}

class SurveyResultComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onChange = (pageIndex) => {
    this.props.changePage(pageIndex);
    this.refs['backTopComponent'].scrollToTop()
    this.forceUpdate();
  }
  getRightAnswer(choices) {
    return choices.filter((c, i) => {
      c.index = letters[i];
      return c.score != 0
    }).map(c => c.index).join()
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
                    <div key={`${i}-${j}`}  className={`${styles.choice} ${choice.select && choice.score != 0 ? styles.rightChoiceSelected : ''}  ${choice.select && choice.score == 0 ? styles.wrongChoiceSelected : ''}`} >
                      {letters[j] + '、' + choice.content}</div>
                  )
                }
                <p className={styles.rightChoiceSelected}>正确答案: {this.getRightAnswer(question.choices)}</p>
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

export default connect(mapStateToProps)(SurveyResult);
