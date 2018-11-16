import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Upload, Icon, message } from 'antd';
import ManageList from '@/pages/Manager';
import './style.scss';

const Dragger = Upload.Dragger;

class ImportUserTable extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const props = {
      name: 'excel',
      action: 'https://api.youthol.cn/api/oa/user/import',
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };

    return (
      <ManageList>
        <Form className="import-form" onSubmit={this.handleExport}>
          <Form.Item>
            {getFieldDecorator('excel', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data
                  or other band files
                </p>
              </Dragger>
            )}
          </Form.Item>
        </Form>
      </ManageList>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Form.create()(ImportUserTable));
