import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import LOGO from '../assets/images/youthol_logo_lg@700x300.png';
import LOGOMINI from '../assets/images/youthol_logo_md@300x300.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

const PageSider = ({ collapsed, handleCollapse }) => {
  return (
    <Sider
      breakpoint="lg"
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
    >
      <div className="logo">
        <img
          src={collapsed ? LOGOMINI : LOGO}
          alt="LOGO"
          className="logo-img"
        />
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <Link to={`/`} />
          <Icon type="dashboard" />
          <span>首页</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="laptop" />
              <span>权限管理</span>
            </span>
          }
        >
          <Menu.Item key="11">用户</Menu.Item>
          <Menu.Item key="12">角色</Menu.Item>
          <Menu.Item key="13">权限</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">
          <Icon type="laptop" />
          <span>内容管理</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={`/signin`} />
          <Icon type="compass" />
          <span>值班签到系统</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to={`/equipment`} />          
          <Icon type="compass" />
          <span>设备借用记录</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to={`/schedule`} />
          <Icon type="compass" />
          <span>网站日程安排</span>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to={`/workload`} />
          <Icon type="compass" />
          <span>工作量统计</span>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to={`/phonebook`} />
          <Icon type="compass" />
          <span>办公电话表</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

PageSider.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  handleCollapse: PropTypes.func.isRequired
};

export default PageSider;
