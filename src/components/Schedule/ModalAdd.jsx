import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, DatePicker } from 'antd';

const FormItem = Form.Item;

const ModalAdd = props => {
  const { getFieldDecorator, getFieldError, isFieldTouched } = props.form;
  const eventnameError =
    isFieldTouched('event_name') && getFieldError('event_name');
  const eventplaceError =
    isFieldTouched('event_place') && getFieldError('event_place');
  const eventdateError =
    isFieldTouched('event_date') && getFieldError('event_date');
  const sponsorError = isFieldTouched('sponsor') && getFieldError('sponsor');

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
      title="新增日程"
      visible={props.visible}
      onOk={() => props.handleOk('add')}
      onCancel={() => props.handleCancel('add')}
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label="活动名称"
          validateStatus={eventnameError ? 'error' : ''}
          help={eventnameError || ''}
        >
          {getFieldDecorator('event_name', {
            rules: [{ required: true, message: '活动名称不能为空!' }]
          })(<Input placeholder="请输入活动名称" autoComplete="off" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="活动地点"
          validateStatus={eventplaceError ? 'error' : ''}
          help={eventplaceError || ''}
        >
          {getFieldDecorator('event_place', {
            rules: [{ required: true, message: '活动名称不能为空!' }]
          })(<Input placeholder="请输入活动名称" autoComplete="off" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="活动时间"
          validateStatus={eventdateError ? 'error' : ''}
          help={eventdateError || ''}
        >
          {getFieldDecorator('event_date', {
            rules: [{ required: true, message: '借用时间不能为空!' }]
          })(
            <DatePicker
              showTime
              showToday
              allowClear
              format="YYYY-MM-DD HH:mm"
              placeholder="请选择时间"
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="发起人"
          validateStatus={sponsorError ? 'error' : ''}
          help={sponsorError || ''}
        >
          {getFieldDecorator('sponsor', {
            rules: [{ required: true, message: '活动发起人学号不能为空!' }]
          })(<Input placeholder="请输入发起人学号" autoComplete="off" />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

ModalAdd.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default ModalAdd;
