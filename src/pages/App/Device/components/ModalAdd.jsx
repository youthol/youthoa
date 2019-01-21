import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Radio, Input, DatePicker } from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
        title="借用设备"
        visible={this.props.visible}
        onOk={e => this.props.handleOk('add', this.props.form)}
        onCancel={e => this.props.handleCancel('add', this.props.form)}
      >
        <Form>
          <FormItem {...formItemLayout} label="选择设备">
            {getFieldDecorator('device', {
              rules: [{ required: true, message: '请选择设备!' }]
            })(
              <RadioGroup>
                {this.props.equipments &&
                  this.props.equipments.map(item => (
                    <RadioButton key={item.id} value={item.id}>
                      {item.device_name}
                    </RadioButton>
                  ))}
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="活动名称">
            {getFieldDecorator('activity', {
              rules: [{ required: true, message: '活动名称不能为空!' }]
            })(<Input placeholder="请输入活动名称" autoComplete="off" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="借用时间">
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
          <FormItem {...formItemLayout} label="借用人">
            {getFieldDecorator('lend_user', {
              rules: [{ required: true, message: '借用人不能为空!' }]
            })(<Input placeholder="请输入借用人或单位名称" autoComplete="off" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="备忘人">
            {getFieldDecorator('memo_user', {
              rules: [{ required: true, message: '备忘人不能为空!' }]
            })(<Input placeholder="请输入备忘人学号" autoComplete="off" />)}
          </FormItem>
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
