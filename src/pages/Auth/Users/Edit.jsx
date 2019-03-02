import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, InputNumber, Checkbox, DatePicker, Select } from 'antd';
import moment from 'moment';
import BasicLayout from '@/layouts/BasicLayout';
import { getUserById, putUser, getRoles } from '@/api/auth';

const FormItem = Form.Item;

class UserEdit extends Component {
  state = {
    userid: 0,
    userInfo: {},
    roles: [],
    roleList: []
  };
  componentDidMount() {
    this.initialization();
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values, {
          birthday: moment(values.birthday).format('YYYY-MM-DD'),
          department: values.department.join('+'),
          duty_at: values.duty_at.join('|')
        });
        this.putUserInfo(values.id, data);
      }
    });
  };
  initialization = async () => {
    const id = this.props.match.params.id;
    const roles = await getRoles();
    const user = await getUserById(id);
    this.setState({
      roleList: roles.data.map(el => ({ label: el.display_name, value: el.id })),
      userinfo: user.data.userinfo,
      roles: user.data.roles.map(el => el.id)
    });
  };
  putUserInfo = async (id, data) => {
    if (!id || !data) return;
    await putUser(id, data);
    this.props.history.push('/users');
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
    const departmentOpts = [
      { label: '媒体中心', value: '媒体中心' },
      { label: '新闻记者部', value: '新闻记者部' },
      { label: '综合部', value: '综合部' },
      { label: '技术部', value: '技术部' },
      { label: '品牌部', value: '品牌部' },
      { label: '摄影小组', value: '摄影小组' },
      { label: '道德星空', value: '道德星空' }
    ];
    const dutyOpts = [
      '0:1',
      '0:2',
      '0:3',
      '0:4',
      '0:5',
      '1:1',
      '1:2',
      '1:3',
      '1:4',
      '1:5',
      '2:1',
      '2:2',
      '2:3',
      '2:4',
      '2:5',
      '3:1',
      '3:2',
      '3:3',
      '3:4',
      '3:5',
      '4:1',
      '4:2',
      '4:3',
      '4:4',
      '4:5',
      '5:1',
      '5:2',
      '5:3',
      '5:4',
      '5:5',
      '6:1',
      '6:2',
      '6:3',
      '6:4',
      '6:5'
    ];
    getFieldDecorator('id', { initialValue: this.state.userinfo ? this.state.userinfo.id : 0 });
    return (
      <BasicLayout>
        {this.state.userinfo && (
          <Form onSubmit={this.handleSubmit}>
            {/* <h2>{props.title || 'LOGIN'}</h2> */}
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name', {
                initialValue: this.state.userinfo.name,
                rules: [{ required: true, message: 'Please input your name!' }]
              })(<Input autoComplete="off" placeholder="请输入姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学号">
              {getFieldDecorator('sdut_id', {
                initialValue: this.state.userinfo.sdut_id,
                rules: [{ required: true, message: 'Please input your SdutID!' }]
              })(<Input autoComplete="off" placeholder="请输入学号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="所属部门">
              {getFieldDecorator('department', {
                initialValue: this.state.userinfo.department.split('+'),
                rules: [{ required: true, message: 'Please choose your department!' }]
              })(<Checkbox.Group options={departmentOpts} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="年级">
              {getFieldDecorator('grade', {
                initialValue: this.state.userinfo.grade,
                rules: [{ required: true, message: 'Please input your grade!' }]
              })(<InputNumber min={2001} max={new Date().getFullYear()} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="联系方式">
              {getFieldDecorator('phone', {
                initialValue: this.state.userinfo.phone
              })(<Input autoComplete="off" placeholder="请输入联系方式" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="生日">
              {getFieldDecorator('birthday', {
                initialValue: moment(this.state.userinfo.birthday)
              })(<DatePicker placeholder="请选择生日" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="所属角色">
              {getFieldDecorator('roles', {
                initialValue: this.state.roles,
                rules: [{ required: true, message: 'Please select your role!' }]
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
            <FormItem {...formItemLayout} label="值班时间">
              {getFieldDecorator('duty_at', {
                initialValue: this.state.userinfo.duty_at
                  ? this.state.userinfo.duty_at.split('|')
                  : []
              })(
                <Select mode="multiple" placeholder="输入值班时间">
                  {dutyOpts.map(item => (
                    <Select.Option key={item} value={item}>
                      {item}
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
        )}
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API,
  userinfo: state.currentUser.userinfo,
  roles: state.currentUser.roles,
  permissions: state.currentUser.permissions
});

export default connect(mapStateToProps)(Form.create()(UserEdit));
