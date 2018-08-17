import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, message } from 'antd';
import DataList from '../../components/Signin/DataList';
import SigninBtn from '../../components/Signin/SigninBtn';

const { Content } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }
  componentDidMount() {
    this.getRecordList();
  }
  getRecordList = () => {
    fetch(`${this.props.baseUrl.localhost}signin`)
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data.data });
      })
      .catch(err => console.log('错误:', err));
  };
  handleChange = e => {
    const inputValue = e.target.value;
    if (Number(inputValue)) {
      this.setState({ inputValue });
    }
  };
  handleSubmit = val => {
    if (!val) {
      message.error('学号不能为空喔~');
    } else {
      this.setState({ inputValue: '' });
      fetch(`${this.props.baseUrl.localhost}signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `sdut_id=${val}`
      })
        .then(res => res.json())
        .then(data => {
          if (data.data.status === '0') {
            message.success(`${val}签到成功~`);
          } else {
            message.info(`${val}已签退~`);
          }
          this.getRecordList();
        })
        .catch(err => console.log('错误:', err));
    }
  };
  render() {
    return (
      <Content className="page__bd">
        <DataList data={this.state.data} />
        <SigninBtn
          inputValue={this.state.inputValue}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Index);
