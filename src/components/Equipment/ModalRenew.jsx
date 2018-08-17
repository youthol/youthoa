import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

const ModalRenew = props => {
  const { getFieldDecorator, getFieldError, isFieldTouched } = props.form;
  const rememouserError =
    isFieldTouched('rememo_user') && getFieldError('rememo_user');
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
      onOk={() => props.handleOk('renew')}
      onCancel={() => props.handleCancel('renew')}
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label="备忘人"
          validateStatus={rememouserError ? 'error' : ''}
          help={rememouserError || ''}
        >
          {getFieldDecorator('rememo_user', {
            rules: [{ required: true, message: '备忘人不能为空!' }]
          })(<Input placeholder="请输入备忘人学号" autoComplete="off" />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

ModalRenew.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default ModalRenew;
