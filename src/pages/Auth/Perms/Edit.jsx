import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';

const FormItem = Form.Item;

class PremsEdit extends Component {
  state = {
    premInfo: {}
  };
  componentDidMount() {
    const id = this.props.history.location.pathname.split('/')[3];
    this.getPermById(id);
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        this.putPermInfo(values.id, values);
      }
    });
  };
  getPermById = id => {
    if (!id) return;
    const { BASE_API } = this.props;
    const { token } = sessionStorage;
    axios
      .get(`${BASE_API}/permission/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.setState({
          permInfo: res.data.data
        });
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
  putPermInfo = (id, data) => {
    if (!id || !data) return;
    const { BASE_API, userinfo, permissions } = this.props;
    // TODO: 判断权限
    const { token } = sessionStorage;
    const params = qs.stringify(data);
    axios
      .put(`${BASE_API}/permission/${id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.props.history.push('/perms');
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
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 8,
          offset: 8
        }
      }
    };
    getFieldDecorator('id', { initialValue: this.state.permInfo ? this.state.permInfo.id : 0 });
    return (
      <BasicLayout>
        {this.state.permInfo && (
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Name">
              {getFieldDecorator('name', {
                initialValue: this.state.permInfo.name,
                rules: [{ required: true, message: 'Please input Name!' }]
              })(<Input autoComplete="off" placeholder="请输入姓名" disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Guard Name">
              {getFieldDecorator('guard_name', {
                initialValue: this.state.permInfo.guard_name,
                rules: [{ required: true, message: 'Please input Guard Name!' }]
              })(<Input autoComplete="off" placeholder="请输入学号" disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Display Name">
              {getFieldDecorator('display_name', {
                initialValue: this.state.permInfo.display_name,
                rules: [{ required: true, message: 'Please input Display Name!' }]
              })(<Input autoComplete="off" placeholder="请输入学号" />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                提交
              </Button>
            </FormItem>
          </Form>
        )}
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API
});

export default connect(mapStateToProps)(Form.create()(PremsEdit));
