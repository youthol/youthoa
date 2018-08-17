import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Radio, Input, DatePicker } from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const ModalAdd = props => {
  const { getFieldDecorator, getFieldError, isFieldTouched } = props.form;
  const deviceError = isFieldTouched('device') && getFieldError('device');
  const activityError = isFieldTouched('activity') && getFieldError('activity');
  const lendatError = isFieldTouched('lend_at') && getFieldError('lend_at');
  const lenduserError =
    isFieldTouched('lend_user') && getFieldError('lend_user');
  const memouserError =
    isFieldTouched('memo_user') && getFieldError('memo_user');
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
      title="借用设备"
      visible={props.visible}
      onOk={() => props.handleOk('add')}
      onCancel={() => props.handleCancel('add')}
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label="选择设备"
          validateStatus={deviceError ? 'error' : ''}
          help={deviceError || ''}
        >
          {getFieldDecorator('device', {
            rules: [{ required: true, message: '请选择设备!' }]
          })(
            <RadioGroup onChange={props.onChange}>
              {props.equipments &&
                props.equipments.map(item => (
                  <RadioButton key={item.id} value={item.device_name}>
                    {item.device_name}
                  </RadioButton>
                ))}
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="活动名称"
          validateStatus={activityError ? 'error' : ''}
          help={activityError || ''}
        >
          {getFieldDecorator('activity', {
            rules: [{ required: true, message: '活动名称不能为空!' }]
          })(<Input placeholder="请输入活动名称" autoComplete="off" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="借用时间"
          validateStatus={lendatError ? 'error' : ''}
          help={lendatError || ''}
        >
          {getFieldDecorator('lend_at', {
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
          label="借用人"
          validateStatus={lenduserError ? 'error' : ''}
          help={lenduserError || ''}
        >
          {getFieldDecorator('lend_user', {
            rules: [{ required: true, message: '借用人不能为空!' }]
          })(<Input placeholder="请输入借用人或单位名称" autoComplete="off" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="备忘人"
          validateStatus={memouserError ? 'error' : ''}
          help={memouserError || ''}
        >
          {getFieldDecorator('memo_user', {
            rules: [{ required: true, message: '备忘人不能为空!' }]
          })(<Input placeholder="请输入备忘人学号" autoComplete="off" />)}
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
