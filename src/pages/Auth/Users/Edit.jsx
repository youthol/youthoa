import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Button, InputNumber, Checkbox, DatePicker, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import BasicLayout from '@/layouts/BasicLayout';

const FormItem = Form.Item;

class UserEdit extends Component {
  state = {
    userid: '',
    userInfo: null,
    roleList: null
  };
  componentDidMount() {
    const userid = this.props.history.location.pathname.split('/')[3];
    this.getRoleList();
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
  onChange = e => {
    console.log(e);
  };
  getUserInfo = id => {
    if (!id) return;
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/users/${id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  getRoleList = () => {
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/roles`)
      .then(res => {
        const { data } = res.data;
        const roleList = data.map(item => ({
          label: item.display_name,
          value: item.id
        }));
        this.setState({ roleList });
        console.log(roleList);
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
          {/* <h2>{props.title || 'LOGIN'}</h2> */}
          <FormItem {...formItemLayout} label="姓名">
            {getFieldDecorator('name', {
              initialValue: '张强',
              rules: [{ required: true, message: 'Please input your Username!' }]
            })(<Input autoComplete="off" placeholder="请输入姓名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="学号">
            {getFieldDecorator('sdut_id', {
              initialValue: '15110302127',
              rules: [{ required: true, message: 'Please input your SDUTID!' }]
            })(<Input autoComplete="off" placeholder="请输入学号" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="所属部门">
            {getFieldDecorator('department', {
              initialValue: ['Apple'],
              rules: [{ required: true, message: 'Please input your Department!' }]
            })(<Checkbox.Group options={options} onChange={this.onChange} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="年级">
            {getFieldDecorator('grade', {
              initialValue: '2015',
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(<InputNumber min={2001} max={new Date().getFullYear()} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="联系方式">
            {getFieldDecorator('phone', {
              initialValue: '17864305305',
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(<Input autoComplete="off" placeholder="请输入联系方式" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="生日">
            {getFieldDecorator('birthday', {
              initialValue: moment('1996-12-01'),
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(<DatePicker placeholder="请选择生日" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="所属角色">
            {getFieldDecorator('roles', {
              initialValue: [1],
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Select mode="multiple" placeholder="请选择用户所拥有的角色">
                {this.state.roleList &&
                  this.state.roleList.map(item => (
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

export default connect(mapStateToProps)(Form.create()(UserEdit));
