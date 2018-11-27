import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import LoginForm from './components/LoginForm';
import { updateUserInfo } from '@/actions/userinfo';
import './style.scss';

class Login extends Component {
  componentDidMount() {
    const { token, expires_at } = sessionStorage;
    if (token && expires_at) {
      this.props.history.push('/');
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        this.postLoginData(values);
      }
    });
  };
  postLoginData = data => {
    if (!data) return;
    const { baseUrl } = this.props;
    const params = qs.stringify(data);
    axios
      .post(`${baseUrl}/login`, params)
      .then(res => {
        const { access_token, expires_in } = res.data.data;
        const expires_at = moment()
          .add(expires_in, 'second')
          .format('YYYY-MM-DD HH:mm:ss');
        sessionStorage.clear();
        sessionStorage.setItem('token', access_token);
        sessionStorage.setItem('expires_at', expires_at);
        this.getUserInfo(access_token);
      })
      .catch(err => {
        console.log(err);
      });
  };
  getUserInfo = token => {
    if (!token) return;
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/user`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        this.props.updateUserInfo(res.data.data);
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
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
  baseUrl: state.baseUrl
});

const mapDispatchToProps = dispatch => ({
  updateUserInfo: bindActionCreators(updateUserInfo, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
