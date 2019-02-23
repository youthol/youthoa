import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

class ModalEdit extends Component {
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
        title="修改工作量"
        visible={this.props.visible}
        onOk={e => this.props.handleOk('edit', this.props.form)}
        onCancel={e => this.props.handleCancel('edit', this.props.form)}
      >
        {this.props.data && (
          <Form>
          <FormItem {...formItemLayout} label="成员学号">
            {getFieldDecorator('sdut_id', {
              initialValue: this.props.data.sdut_id,
              rules: [{ required: true, message: '被统计人学号不能为空!' }]
            })(<Input placeholder="请输入被统计人学号" autoComplete="off" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="工作量描述">
            {getFieldDecorator('description', {
              initialValue: this.props.data.description,
              rules: [{ required: true, message: '工作量描述不能为空!' }]
            })(<Input placeholder="请输入工作量描述" autoComplete="off" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="工作量">
            {getFieldDecorator('score', {
              initialValue: this.props.data.score,
              rules: [{ required: true, message: '工作量不能为空!' }]
            })(<InputNumber placeholder="数值" min={1} />)}
          </FormItem>
        </Form>

        )}
        
      </Modal>
    );
  }
}

ModalEdit.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default Form.create()(ModalEdit);
