import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import { getPermById, putPerm } from '@/api/auth';

const FormItem = Form.Item;

class PremsEdit extends Component {
  state = {
    premInfo: {}
  };
  componentDidMount() {
    this.initialization();
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        this.putPermInfo(values.id, values);
      }
    });
  };
  initialization = async () => {
    const id = this.props.match.params.id;
    const rowData = await getPermById(id);
    this.setState({
      permInfo: rowData.data
    });
  };
  putPermInfo = async (id, data) => {
    if (!id || !data) return;
    await putPerm(id, data);
    this.props.history.push('/perms');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 8,
          offset: 8
        }
      }
    };
    getFieldDecorator('id', { initialValue: this.state.permInfo ? this.state.permInfo.id : 0 });
    return (
      <BasicLayout>
        {this.state.permInfo && (
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Name">
              {getFieldDecorator('name', {
                initialValue: this.state.permInfo.name,
                rules: [{ required: true, message: 'Please input Name!' }]
              })(<Input autoComplete="off" placeholder="请输入姓名" disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Guard Name">
              {getFieldDecorator('guard_name', {
                initialValue: this.state.permInfo.guard_name,
                rules: [{ required: true, message: 'Please input Guard Name!' }]
              })(<Input autoComplete="off" placeholder="请输入学号" disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Display Name">
              {getFieldDecorator('display_name', {
                initialValue: this.state.permInfo.display_name,
                rules: [{ required: true, message: 'Please input Display Name!' }]
              })(<Input autoComplete="off" placeholder="请输入学号" />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                提交
              </Button>
            </FormItem>
          </Form>
        )}
      </BasicLayout>
    );
  }
}

export default Form.create()(PremsEdit);
