import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, DatePicker } from 'antd';

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
        title="新增日程"
        visible={this.props.visible}
        onOk={e => this.props.handleOk('add', this.props.form)}
        onCancel={e => this.props.handleCancel('add', this.props.form)}
      >
        <Form>
          <FormItem {...formItemLayout} label="活动名称">
            {getFieldDecorator('event_name', {
              rules: [{ required: true, message: '活动名称不能为空!' }]
            })(<Input placeholder="请输入活动名称" autoComplete="off" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="活动地点">
            {getFieldDecorator('event_place', {
              rules: [{ required: true, message: '活动名称不能为空!' }]
            })(<Input placeholder="请输入活动名称" autoComplete="off" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="活动时间">
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
          <FormItem {...formItemLayout} label="发起人">
            {getFieldDecorator('sponsor', {
              rules: [{ required: true, message: '活动发起人学号不能为空!' }]
            })(<Input placeholder="请输入发起人学号" autoComplete="off" />)}
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
