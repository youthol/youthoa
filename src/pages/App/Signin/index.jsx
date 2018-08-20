import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import DataList from '@/components/Signin/DataList';
import SigninInput from '@/components/Signin/SigninInput';

class AppSignin extends Component {
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
    axios
      .get(`${this.props.baseUrl}/signin`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.setState({ data: res.data.data });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  handleChange = e => {
    const inputValue = e.target.value;
    if (Number(inputValue)) {
      this.setState({ inputValue });
    }
  };
  handleSubmit = val => {
    if (!val) {
      message.error('学号不能为空');
      return;
    }
    this.setState({ inputValue: '' });
    const params = qs.stringify({ sdut_id: val });
    axios
      .post(`${this.props.baseUrl}/signin`, params)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          switch (res.data.data.status) {
            case '0':
              message.success(`${val}签到成功`);
              break;
            default:
              message.success(`${val}已签退`);
          }
          this.getRecordList();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <DataList data={this.state.data} />
        <SigninInput
          inputValue={this.state.inputValue}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(AppSignin);
