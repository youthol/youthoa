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
      inputValue: '',
    };
  }

  componentDidMount() {
    this.getRecordList();
  }

  /**
   * @description 处理输入事件
   * @param {*} e
   */
  handleChange = e => {
    const inputValue = e.target.value;
    if (Number(inputValue)) {
      this.setState({ inputValue });
    }
  };

  /**
   * @description 处理提交事件
   * @param {*} val
   * @returns
   */
  handleSubmit = val => {
    if (!val) {
      message.error('学号不能为空');
      return;
    }
    this.postSignin(val);
    this.setState({ inputValue: '' });
  };

  /**
   * @description 请求当天签到数据
   */
  getRecordList = () => {
    axios
      .get(`${this.props.baseUrl}/signin`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const data = res.data.data.map(el => ({
            ...el,
            key: el.id,
          }));
          this.setState({ data });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  /**
   * @description 发送签到数据
   * @param {*} id 学号
   * @returns
   */
  postSignin = id => {
    if (!id) return;
    const { baseUrl } = this.props;
    const params = qs.stringify({ sdut_id: id });

    axios
      .post(`${baseUrl}/signin`, params)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          console.log(res.data);
          switch (res.data.data.status) {
            case 0:
              message.success(`${id}签到成功`);
              break;
            default:
              message.success(`${id}已签退`);
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
  baseUrl: state.baseUrl,
});

export default connect(mapStateToProps)(AppSignin);
