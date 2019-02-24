import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'antd';
import moment from 'moment';
import BasicLayout from '@/layouts/BasicLayout';
import LoginForm from './components/LoginForm';
import { setUserInfo } from './redux/actions';
import { postLogin, getUserInfo } from '@/api/login';
import './style.scss';

class Login extends Component {
  componentDidMount() {
    const { token, expires_at } = sessionStorage;
    if (token && moment().isBefore(expires_at)) {
      this.props.history.push('/');
    }
  }

  /**
   * @description 处理提交事件
   * @param {*} e
   */
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        this.postUserLogin(values);
      }
    });
  };

  /**
   * @description 异步发送数据
   * @param {*} value 发送的数据对象，包括学号和密码
   * @returns
   */
  postUserLogin = async value => {
    if (!value) return;
    const rowData = await postLogin(value);
    const { access_token, expires_in } = rowData.data;
    const expires_at = moment()
      .add(expires_in, 'second')
      .format('YYYY-MM-DD HH:mm:ss');
    sessionStorage.clear();
    sessionStorage.setItem('token', access_token);
    sessionStorage.setItem('expires_at', expires_at);
    const userInfo = await getUserInfo();
    this.props.setUserInfo(userInfo);
    this.props.history.push('/');
  };
  render() {
    return (
      <BasicLayout>
        <LoginForm form={this.props.form} handleSubmit={this.handleSubmit} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API
});

const mapDispatchToProps = dispatch => ({
  setUserInfo: bindActionCreators(setUserInfo, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
