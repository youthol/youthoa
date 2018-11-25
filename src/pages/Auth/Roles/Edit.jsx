import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import axios from 'axios';
import BasicLayout from '@/layouts/BasicLayout';

const FormItem = Form.Item;

class RoleEdit extends Component {
  state = {
    permList: null
  };
  componentDidMount() {
    const roelid = this.props.history.location.pathname.split('/')[3];
    this.getPermList();
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };
  getPermList = () => {
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/permissions`)
      .then(res => {
        const { data } = res.data;
        const permList = data.map(item => ({
          label: item.display_name,
          value: item.id
        }));
        this.setState({ permList });
        console.log(permList);
      })
      .catch(err => {
        console.log(err);
      });
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
    // 多选框选项
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' }
    ];
    return (
      <BasicLayout history={this.props.history}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Name">
            {getFieldDecorator('name', {
              initialValue: 'Formal',
              rules: [{ required: true, message: 'Please input Name!' }]
            })(<Input autoComplete="off" placeholder="请输入姓名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Guard Name">
            {getFieldDecorator('guard_name', {
              initialValue: 'oa',
              rules: [{ required: true, message: 'Please input Guard Name!' }]
            })(<Input autoComplete="off" placeholder="请输入学号" disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Display Name">
            {getFieldDecorator('display_name', {
              initialValue: '正式',
              rules: [{ required: true, message: 'Please input Display Name!' }]
            })(<Input autoComplete="off" placeholder="请输入学号" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="拥有权限">
            {getFieldDecorator('permissions', {
              initialValue: [1],
              rules: [{ required: true, message: 'Please select permissions!' }]
            })(
              <Select mode="multiple" placeholder="请选择角色所拥有的权限">
                {this.state.permList &&
                  this.state.permList.map(item => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              提交
            </Button>
          </FormItem>
        </Form>
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Form.create()(RoleEdit));