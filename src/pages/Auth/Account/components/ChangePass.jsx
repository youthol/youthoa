/**
 * @author Gsc 
 * @file   修改用户(成员)密码
 * @todo   校验密码强度
 * @todo   校验密码与重复密码
 * @todo   后端接口, 与前端接口
 */

import { Form, Icon, Input, Button } from 'antd';
import React, { Component } from 'react'

/**
 * 修改个人密码
 */
class ChangePass extends Component {
  /**
   * 修改密码提交事件
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err ) {
        console.log('%cChangePass.jsx line:15 values', 'color: #26bfa5;', values);
      }
    });
  };
  /**
   *  
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入新密码' ,min:6},
              { mim: 6, message: '密码长度过短' },
              { max: 32, message: '密码长度过长' }
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="输入新密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: '请再次输入新密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="重复新密码"
            />,
          )}
        </Form.Item>
        <Form.Item>

          <Button type="primary" htmlType="submit" className="login-form-button">
            重置密码
          </Button>

        </Form.Item>
      </Form>
    );
  }
}

/**
 * 修改个人密码
 */
export default Form.create({ name: 'change_pass' })(ChangePass);

