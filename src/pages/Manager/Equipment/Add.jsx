import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import {  postEquipment } from '@/api/equipment';
import BasicLayout from '@/layouts/BasicLayout';

const FormItem = Form.Item;

class Add extends Component {
  state = {
    userid: 0,
    userInfo: {},
  };
  /**
   * 生命周期钩子
   */
  componentDidMount() {
    this.initialization();
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values, {
        });
        console.log('%cAdd.jsx line:30 data', 'color: #26bfa5;', data);
        this.postEquipmentInfo( data);
      }
    });
  };
  initialization = async () => {
    this.setState({
      userinfo:{
        "id": null,
        "name": null,
        "sdut_id": null,
        "department":"",
        "grade": null,
        "phone": null,
        "birthday": null,
        
        "duty_at": null
    },
    });
  };
  postEquipmentInfo = async ( data) => {
    if ( !data) return;
    await postEquipment( data);
    this.props.history.push('/manage/equipment');
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
    
 
    getFieldDecorator('id', { initialValue: this.state.userinfo ? this.state.userinfo.id : 0 });
    return (
      <BasicLayout>
        {this.state.userinfo && 
        (
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="设备名称">
              {getFieldDecorator('device_name', {
                initialValue: this.state.userinfo.name,
                rules: [{ required: true, message: 'Please input your name!' }]
              })(<Input autoComplete="off" placeholder="请输入设备名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="设备类型">
              {getFieldDecorator('device_type', {
                initialValue: this.state.userinfo.sdut_id,
                rules: [{ required: true, message: 'Please input your SdutID!' }]
              })(<Input autoComplete="off" placeholder="请输入设备类型" />)}
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


export default  (Form.create()(Add));
