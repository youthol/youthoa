import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';

const FormItem = Form.Item;

class PremsEdit extends Component {
  componentDidMount() {
    const id = this.props.history.location.pathname.split('/')[3];
    this.getPremById(id);
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };
  getPremById = id => {
    if (!id) return;
    const { baseUrl } = this.props;
    const { token } = sessionStorage;
    axios
      .get(`${baseUrl}/permission/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  putPermInfo = (id, data) => {
    if (!id || !data) return;
    const { baseUrl, userinfo, permissions } = this.props;
    // TODO: 判断权限
    const { token } = sessionStorage;
    const params = qs.stringify(data);
    axios
      .put(`${baseUrl}/permission/${id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res);
        this.getPermById(id);
      })
      .catch(err => {
        console.error(err);
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
    return (
      <BasicLayout history={this.props.history}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Name">
            {getFieldDecorator('name', {
              initialValue: 'manage_administrator',
              rules: [{ required: true, message: 'Please input Name!' }]
            })(<Input autoComplete="off" placeholder="请输入姓名" disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Guard Name">
            {getFieldDecorator('guard_name', {
              initialValue: 'oa',
              rules: [{ required: true, message: 'Please input Guard Name!' }]
            })(<Input autoComplete="off" placeholder="请输入学号" disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Display Name">
            {getFieldDecorator('display_name', {
              initialValue: '正式',
              rules: [{ required: true, message: 'Please input Display Name!' }]
            })(<Input autoComplete="off" placeholder="请输入学号" />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              提交
            </Button>
          </FormItem>
        </Form>
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Form.create()(PremsEdit));
