import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import LoginForm from '@/components/Auth/Login/LoginForm';
import { updateBaseInfo, updateAuthInfo } from '@/actions/userinfo';
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
        const { data, meta } = res.data;
        const expires_at = moment()
          .add(meta.expires_in, 'second')
          .format('YYYY-MM-DD HH:mm:ss');
        sessionStorage.clear();
        sessionStorage.setItem('token', meta.access_token);
        sessionStorage.setItem('expires_at', expires_at);
        this.props.updateBaseInfo(data);
        // this.props.updateAuthInfo();
        this.getAuthInfo(meta.access_token);
        this.props.history.push('/');
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  getAuthInfo = token => {
    if (!token) return;
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/user/permissions`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        this.props.updateAuthInfo(res.data.data);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <LoginForm form={this.props.form} handleSubmit={this.handleSubmit} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

const mapDispatchToProps = dispatch => ({
  updateBaseInfo: bindActionCreators(updateBaseInfo, dispatch),
  updateAuthInfo: bindActionCreators(updateAuthInfo, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
