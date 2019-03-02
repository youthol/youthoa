import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import { getRoleById, putRole, getPerms } from '@/api/auth';

const FormItem = Form.Item;

class RoleEdit extends Component {
  state = {
    permList: null,
    roleInfo: {},
    permissions: []
  };
  componentDidMount() {
    this.initialization();
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
  initialization = async () => {
    const id = this.props.match.params.id;
    const perms = await getPerms();
    const role = await getRoleById(id);
    this.setState({
      permList: perms.data.map(el => ({ label: el.display_name, value: el.id })),
      roleInfo: role.data,
      permissions: role.data.permissions.map(el => el.id)
    });
  };

  putRoleInfo = async (id, data) => {
    if (!id || !data) return;
    await putRole(id, data);
    this.props.history.push('/roles');
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

export default Form.create()(RoleEdit);
