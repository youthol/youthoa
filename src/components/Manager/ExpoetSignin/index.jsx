import React from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker, Button } from 'antd';
import './style.scss';

const { RangePicker } = DatePicker;

const ExportSigninTable = props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form className="export-form" onSubmit={e => props.handleExport(e, props.form)}>
      <Form.Item>
        {getFieldDecorator('daterange', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(<RangePicker onChange={this.onChange} />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          导出数据
        </Button>
      </Form.Item>
    </Form>
  );
};

ExportSigninTable.propTypes = {};

export default Form.create()(ExportSigninTable);
