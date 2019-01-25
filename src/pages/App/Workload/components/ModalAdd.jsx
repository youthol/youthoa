import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

class ModalAdd extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    return (
      <Modal
        title="记录工作量"
        visible={this.props.visible}
        onOk={e => this.props.handleOk('add', this.props.form)}
        onCancel={e => this.props.handleCancel('add', this.props.form)}
      >
        <Form>
          <FormItem {...formItemLayout} label="姓名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '被统计人学号不能为空!' }]
            })(<Input placeholder="请输入被统计人学号" autoComplete="off" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="工作量描述">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '工作量描述不能为空!' }]
            })(<Input placeholder="请输入工作量描述" autoComplete="off" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="工作量">
            {getFieldDecorator('wk_count', {
              rules: [{ required: true, message: '工作量不能为空!' }]
            })(<InputNumber placeholder="数值" min={1} max={100} />)}
          </FormItem>
          {/* <FormItem {...formItemLayout} label="统计人">
            {getFieldDecorator('manager', {
              rules: [{ required: true, message: '统计人学号不能为空!' }]
            })(<Input placeholder="请输入统计人学号" autoComplete="off" />)}
          </FormItem> */}
        </Form>
      </Modal>
    );
  }
}

ModalAdd.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default Form.create()(ModalAdd);
