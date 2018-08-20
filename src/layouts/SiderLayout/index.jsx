import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Menu theme="dark" defaultSelectedKeys={['a']} mode="inline">
          <Menu.Item key="a">
            <Link to={`/`} />
            <Icon type="dashboard" />
            <span>首页</span>
          </Menu.Item>
          <Menu.SubMenu
            key="b"
            title={
              <span>
                <Icon type="laptop" />
                <span>用户管理</span>
              </span>
            }
          >
            <Menu.Item key="b1">
              <Link to="/users" />
              <span>用户</span>
            </Menu.Item>
            <Menu.Item key="b2">
              <Link to="/roles" />
              <span>角色</span>
            </Menu.Item>
            <Menu.Item key="b3">
              <Link to="/perms" />
              <span>权限</span>
            </Menu.Item>
          </Menu.SubMenu>
          {this.props.isAuth && (
            <Menu.Item key="c">
              <Icon type="laptop" />
              <span>内容管理</span>
            </Menu.Item>
          )}
          <Menu.Item key="d">
            <Link to={`/signin`} />
            <Icon type="compass" />
            <span>值班签到系统</span>
          </Menu.Item>
          <Menu.Item key="e">
            <Link to={`/device`} />
            <Icon type="compass" />
            <span>设备借用记录</span>
          </Menu.Item>
          <Menu.Item key="f">
            <Link to={`/schedule`} />
            <Icon type="compass" />
            <span>网站日程安排</span>
          </Menu.Item>
          <Menu.Item key="g">
            <Link to={`/workload`} />
            <Icon type="compass" />
            <span>工作量统计</span>
          </Menu.Item>
          <Menu.Item key="h">
            <Link to={`/phonebook`} />
            <Icon type="compass" />
            <span>办公电话表</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SiderLayout;
