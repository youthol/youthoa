import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'antd';
import Manager from '@/pages/Manager';
import { downloadFile } from '@/lib/downloadFile';

class ExportSigninTable extends Component {
  handleExport = e => {
    e.preventDefault();
    const { BASE_API } = this.props;

    // url  file name 
    // 封装 导出文件

    try {
      const { token } = sessionStorage;
      let url = `${BASE_API}/phonebook/export?token=${token}`;
      let filename = 'myfile.zip';

      downloadFile(url,filename)
    
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
              导出办公电话数据
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
