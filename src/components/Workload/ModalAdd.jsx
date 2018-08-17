import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

const ModalOut = props => {
  const { getFieldDecorator, getFieldError, isFieldTouched } = props.form;
  const nameError = isFieldTouched('name') && getFieldError('name');
  const descriptionError =
    isFieldTouched('description') && getFieldError('description');
  const wkcountError = isFieldTouched('wk_count') && getFieldError('wk_count');
  const managerError = isFieldTouched('manager') && getFieldError('manager');

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
      title="新增工作量"
      visible={props.visible}
      onOk={() => props.handleOk('add')}
      onCancel={() => props.handleCancel('add')}
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label="姓名"
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '被统计人学号不能为空!' }]
          })(<Input placeholder="请输入被统计人学号" autoComplete="off" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工作量描述"
          validateStatus={descriptionError ? 'error' : ''}
          help={descriptionError || ''}
        >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: '工作量描述不能为空!' }]
          })(<Input placeholder="请输入工作量描述" autoComplete="off" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工作量"
          validateStatus={wkcountError ? 'error' : ''}
          help={wkcountError || ''}
        >
          {getFieldDecorator('wk_count', {
            rules: [{ required: true, message: '工作量不能为空!' }]
          })(<InputNumber min={1} max={100} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="统计人"
          validateStatus={managerError ? 'error' : ''}
          help={managerError || ''}
        >
          {getFieldDecorator('manager', {
            rules: [{ required: true, message: '统计人学号不能为空!' }]
          })(<Input placeholder="请输入统计人学号" autoComplete="off" />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

ModalOut.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default ModalOut;
