import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'antd';
import Manager from '@/pages/Manager';

class ExportSigninTable extends Component {
  handleExport = e => {
    e.preventDefault();
    const { BASE_API } = this.props;

    try {
      const { token } = sessionStorage;
      let a = document.createElement('a');
      let url = `${BASE_API}/phonebook/export?token=${token}`;
      let filename = 'myfile.zip';
      a.href = url;
      a.download = filename;
      a.click();
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <Manager>
        <Form className="export-form" onSubmit={this.handleExport}>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              导出数据
            </Button>
          </Form.Item>
        </Form>
      </Manager>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API
});

export default connect(mapStateToProps)(Form.create()(ExportSigninTable));
