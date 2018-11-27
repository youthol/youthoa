import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';

const FormItem = Form.Item;

class RoleEdit extends Component {
  state = {
    permList: null,
    roleInfo: {},
    permissions: []
  };
  componentDidMount() {
    const id = this.props.history.location.pathname.split('/')[3];
    this.getPermList();
    this.getRoleById(id);
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.putRoleInfo(values.id, values);
      }
    });
  };
  getPermList = () => {
    const { BASE_API } = this.props;
    axios
      .get(`${BASE_API}/permissions`)
      .then(res => {
        const { data } = res.data;
        const permList = data.map(item => ({
          label: item.display_name,
          value: item.id
        }));
        this.setState({ permList });
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
  getRoleById = id => {
    if (!id) return;
    const { BASE_API } = this.props;
    const { token } = sessionStorage;
    axios
      .get(`${BASE_API}/role/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          roleInfo: res.data.data,
          permissions: res.data.data.permissions.map(el => el.id)
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
  putRoleInfo = (id, data) => {
    if (!id || !data) return;
    const { BASE_API, userinfo, permissions } = this.props;
    // TODO: 判断权限
    const { token } = sessionStorage;
    const params = qs.stringify(data);
    axios
      .put(`${BASE_API}/role/${id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res);
        this.getRoleById(id);
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
    getFieldDecorator('id', { initialValue: this.state.roleInfo ? this.state.roleInfo.id : 0 });
    return (
      <BasicLayout>
        {this.state.roleInfo && (
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Name">
              {getFieldDecorator('name', {
                initialValue: this.state.roleInfo.name,
                rules: [{ required: true, message: 'Please input Name!' }]
              })(<Input autoComplete="off" placeholder="请输入姓名" disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Guard Name">
              {getFieldDecorator('guard_name', {
                initialValue: this.state.roleInfo.guard_name,
                rules: [{ required: true, message: 'Please input Guard Name!' }]
              })(<Input autoComplete="off" placeholder="请输入学号" disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Display Name">
              {getFieldDecorator('display_name', {
                initialValue: this.state.roleInfo.display_name,
                rules: [{ required: true, message: 'Please input Display Name!' }]
              })(<Input autoComplete="off" placeholder="请输入学号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="拥有权限">
              {getFieldDecorator('permissions', {
                initialValue: this.state.permissions,
                rules: [{ required: true, message: 'Please select permissions!' }]
              })(
                <Select mode="multiple" placeholder="请选择角色所拥有的权限">
                  {this.state.permList &&
                    this.state.permList.map(item => (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                </Select>
              )}
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

export default connect(mapStateToProps)(Form.create()(RoleEdit));
