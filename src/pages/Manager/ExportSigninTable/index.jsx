import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, DatePicker, Button } from 'antd';
import ManageList from '@/pages/Manager';
import './style.scss';

const { RangePicker } = DatePicker;

class ExportSigninTable extends Component {
  handleExport = e => {
    e.preventDefault();
    const { form, baseUrl } = this.props;
    form.validateFields((err, values) => {
      try {
        if (!err) {
          let [start, end] = values.daterange;
          start = start.format('YYYY-MM-DD');
          end = end.format('YYYY-MM-DD');
          let a = document.createElement('a');
          let url = `${baseUrl}/signin/export?start=${start}&end=${end}`;
          let filename = 'myfile.zip';
          a.href = url;
          a.download = filename;
          a.click();
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <ManageList>
        <Form className="export-form" onSubmit={this.handleExport}>
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
      </ManageList>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Form.create()(ExportSigninTable));
