import React, { Component } from 'react';
import { Modal, message } from 'antd';
import moment from 'moment';
import BasicLayout from '@/layouts/BasicLayout';
import DataList from './components/DataList';
import SigninInput from '../../../components/SigninInput';
import { getRecords, postSignin } from '@/api/signin';

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

  /**
   * @description 处理输入事件
   * @param {*} e
   */
  handleChange = e => {
    const inputValue = e.target.value;
    if (Number(inputValue)) {
      this.setState({ inputValue });
    } else if (Number(this.state.inputValue)) {
      this.setState({ inputValue });
    }
  };

  /**
   * @description 处理提交事件
   * @param {*} val max length is 11
   * @returns
   */
  handleSubmit = value => {
    if (!value || value.length !== 11) {
      return message.error('请输入正确学号');
    }
    if (!this.state.data) {
      message.error('服务器错误，请检查网络是否正常！');
      return;
    }
    const user = this.state.data.filter(el => el.sdut_id === value && el.status === 0);
    const timer = 77;
    if (
      user.length &&
      moment()
        .add(-timer, 'minutes')
        .isBefore(user[0].created_at)
    ) {
      Modal.confirm({
        title: '确定要签退吗?',
        content: '现在签退是早退喔~',
        onOk: () => {
          this.postSignin(value);
        },
        okText: '确认',
        cancelText: '取消'
      });
    } else {
      this.postSignin(value);
    }
    this.setState({ inputValue: '' });
  };

  /**
   * @description 异步请求当天所有签到数据
   */
  getRecordList = async () => {
    const rowData = await getRecords();
    if (rowData) {
      const data = rowData.data.map(el => ({ ...el, key: el.id }));
      this.setState({ data });
    }
  };

  /**
   * @description 异步发送签到数据
   * @param {*} id sdut identity
   * @returns
   */
  postSignin = async id => {
    if (!id) return;
    const rowData = await postSignin({ sdut_id: id });
    const { status, user } = rowData.data;
    switch (status) {
      case 0:
        message.success(`${user.name} 签到成功`);
        break;
      default:
        message.success(`${user.name} 已签退`);
    }
    this.getRecordList();
  };

  render() {
    return (
      <BasicLayout>
        <DataList data={this.state.data} />
        <SigninInput
          inputValue={this.state.inputValue}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          xs={24}
          md={16}
          lg={12}
          className="signin-btn"
        />
      </BasicLayout>
    );
  }
}

export default AppSignin;
