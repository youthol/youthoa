import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import LOGO from '@/assets/youthol_logo_lg@700x300.png';
import LOGOMINI from '@/assets/youthol_logo_md@300x300.png';
import './style.scss';

const { Sider } = Layout;

class SiderLayout extends Component {
  state = {
    collapsed: false
  };
  handleCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    const { permissions } = this.props;
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
            <span>Dashboard</span>
          </Menu.Item>
          {/* {!!permissions &&
            permissions.some(
              item => item.name === 'manage_administrator' || item.name === 'manage_user'
            ) && ( */}
              <Menu.SubMenu
                key="prems"
                title={
                  <span>
                    <Icon type="laptop" />
                    <span>用户管理</span>
                  </span>
                }
              >
                <Menu.Item key="/users">
                  <Link to="/users" />
                  <span>用户</span>
                </Menu.Item>
                <Menu.Item key="/roles">
                  <Link to="/roles" />
                  <span>角色</span>
                </Menu.Item>
                <Menu.Item key="/perms">
                  <Link to="/perms" />
                  <span>权限</span>
                </Menu.Item>
              </Menu.SubMenu>
            {/* )} */}
          {!!permissions &&
            permissions.some(
              item => item.name === 'manage_administrator' || item.name === 'manage_user'
            ) && (
              <Menu.Item key="/manage">
                <Link to="/manage" />
                <Icon type="laptop" />
                <span>系统数据管理</span>
              </Menu.Item>
            )}
          <Menu.Item key="/signin">
            <Link to="/signin" />
            <Icon type="compass" />
            <span>值班签到</span>
          </Menu.Item>
          <Menu.Item key="/device">
            <Link to="/device" />
            <Icon type="compass" />
            <span>设备借用</span>
          </Menu.Item>
          <Menu.Item key="/schedule">
            <Link to="/schedule" />
            <Icon type="compass" />
            <span>日程安排</span>
          </Menu.Item>
          {/* <Menu.Item key="/workload">
            <Link to="/workload" />
            <Icon type="compass" />
            <span>工作量统计</span>
          </Menu.Item>
          <Menu.Item key="/phonebook">
            <Link to="/phonebook" />
            <Icon type="compass" />
            <span>办公电话表</span>
          </Menu.Item> */}
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  userinfo: state.userinfo.userinfo,
  roles: state.userinfo.roles,
  permissions: state.userinfo.permissions
});

export default connect(mapStateToProps)(withRouter(SiderLayout));
