import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class ModalRenew extends Component {
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
        title="日程完结"
        visible={this.props.visible}
        onOk={() => this.props.handleOk('renew', this.props.form)}
        onCancel={() => this.props.handleCancel('renew', this.props.form)}
      >
        <Form>
          <FormItem {...formItemLayout} label="备忘人">
            {getFieldDecorator('user', {
              rules: [{ required: true, message: '备忘人不能为空!' }]
            })(<Input placeholder="请输入备忘人学号" autoComplete="off" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

ModalRenew.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default Form.create()(ModalRenew);
