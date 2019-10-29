import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import LOGO from '@/assets/youthol_logo_lg@700x300.png';
import LOGOMINI from '@/assets/youthol_logo_md@300x300.png';
import './style.scss';
import { checkPermission } from '@/utils/auth';

const { Sider } = Layout;

class SiderLayout extends Component {
  state = {
    collapsed: false
  };
  handleCollapse = collapsed => {
    this.setState({ collapsed });
  };
  // checkPermission = perms => {
  //   const { permissions } = this.props.currentUser;
  //   if (!perms || !permissions) return false;
  //   let hasPermission = false;
  //   for (let i in perms) {
  //     if (permissions.some(item => item.name === perms[i])) {
  //       hasPermission = true;
  //       break;
  //     }
  //   }
  //   return hasPermission;
  // };
  render() {
    return (
      <Sider
        collapsible
        breakpoint="lg"
        collapsed={this.state.collapsed}
        onCollapse={this.handleCollapse}
      >
        <div className="logo">
          <img src={this.state.collapsed ? LOGOMINI : LOGO} alt="LOGO" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          selectedKeys={[this.props.history.location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/" />
            <Icon type="dashboard" />
            <span>首页</span>
          </Menu.Item>
          {checkPermission(['manage_administrator', 'manage_user']) && (
            <Menu.SubMenu
              key="prems"
              title={
                <span>
                  <Icon type="laptop" />
                  <span>管理员管理</span>
                </span>
              }
            >
              <Menu.Item key="/users">
                <Link to="/users" />
                <span>用户管理</span>
              </Menu.Item>
              <Menu.Item key="/roles">
                <Link to="/roles" />
                <span>角色管理</span>
              </Menu.Item>
              <Menu.Item key="/perms">
                <Link to="/perms" />
                <span>权限管理</span>
              </Menu.Item>
            </Menu.SubMenu>
          )}
          {checkPermission(['manage_administrator', 'manage_service']) && (
            <Menu.Item key="/manage">
              <Link to="/manage" />
              <Icon type="laptop" />
              <span>系统数据管理</span>
            </Menu.Item>
          )}
          <Menu.Item key="/signin">
            <Link to="/signin" />
            <Icon type="carry-out" />
            <span>值班签到</span>
          </Menu.Item>
          <Menu.Item key="/device">
            <Link to="/device" />
            <Icon type="camera" />
            <span>设备借用</span>
          </Menu.Item>
          <Menu.Item key="/schedule">
            <Link to="/schedule" />
            <Icon type="calendar" />
            <span>日程安排</span>
          </Menu.Item>
          <Menu.Item key="/workload">
            <Link to="/workload" />
            <Icon type="bar-chart" />
            <span>工作量统计</span>
          </Menu.Item>
          <Menu.Item key="/phonebook">
            <Link to="/phonebook" />
            <Icon type="apartment" />
            <span>办公电话表</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(withRouter(SiderLayout));
