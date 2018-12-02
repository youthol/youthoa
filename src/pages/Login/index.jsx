import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import LoginForm from './components/LoginForm';
import { setUserInfo } from './redux/actions';
import './style.scss';

class Login extends Component {
  componentDidMount() {
    const { token, expires_at } = sessionStorage;
    if (token && moment().isBefore(expires_at)) {
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
    const { BASE_API } = this.props;
    const params = qs.stringify(data);
    axios
      .post(`${BASE_API}/login`, params)
      .then(res => {
        const { access_token, expires_in } = res.data.data;
        const expires_at = moment()
          .add(expires_in, 'second')
          .format('YYYY-MM-DD HH:mm:ss');
        sessionStorage.clear();
        sessionStorage.setItem('token', access_token);
        sessionStorage.setItem('expires_at', expires_at);
        this.props.setUserInfo(access_token);
        this.props.history.push('/');
      })
      .catch(err => {
        try {
          const { errors } = err.response.data;
          if (errors) {
            for (let error in errors) {
              if (errors[error] instanceof Array) {
                errors[error].forEach(el => message.error(el));
              }
            }
          } else {
            message.error(err.response.data.message);
          }
        } catch (e) {
          console.error(e);
        }
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
  BASE_API: state.globalData.BASE_API
});

const mapDispatchToProps = dispatch => ({
  setUserInfo: bindActionCreators(setUserInfo, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
