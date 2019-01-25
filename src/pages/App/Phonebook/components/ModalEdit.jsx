import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, DatePicker } from 'antd';

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
        title="更改办公电话"
        visible={this.props.visible}
        onOk={e => this.props.handleOk('edit', this.props.form)}
        onCancel={e => this.props.handleCancel('edit', this.props.form)}
      >
        {this.props.data && (
          <Form>
            <FormItem {...formItemLayout} label="所属单位">
              {getFieldDecorator('administrative_unit', {
                initialValue: this.props.data.administrative_unit,
                rules: [{ required: true, message: '所属单位名称不能为空!' }]
              })(<Input placeholder="请输入所属单位名称" autoComplete="off" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="办公室">
              {getFieldDecorator('office_location', {
                initialValue: this.props.data.office_location,
                rules: [{ required: true, message: '办公室名称不能为空!' }]
              })(<Input placeholder="请输入办公室名称" autoComplete="off" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="办公人员">
              {getFieldDecorator('office_person', {
                initialValue: this.props.data.office_person,
                rules: [{ required: true, message: '办公人员不能为空!' }]
              })(<Input placeholder="请输入办公人员" autoComplete="off" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="办公电话">
              {getFieldDecorator('telephone', {
                initialValue: this.props.data.telephone,
                rules: [{ required: true, message: '办公电话不能为空!' }]
              })(<Input placeholder="请输入办公电话" autoComplete="off" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('notation', {
                initialValue: this.props.data.notation
              })(<Input placeholder="请输入备注" autoComplete="off" />)}
            </FormItem>
          </Form>
        )}
      </Modal>
    );
  }
}

ModalEdit.propTypes = {
  data: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default Form.create()(ModalEdit);
