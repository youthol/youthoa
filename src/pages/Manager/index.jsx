import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon, Button } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

const SubMenu = Menu.SubMenu;

class Manager extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/manage/expt-signin-rec-tb">导出签到表</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/manage/impt-user-tb">导入成员表</Link>
        </Menu.Item>
        <SubMenu title="Auth">
          <Menu.Item>3rd menu item</Menu.Item>
          <Menu.Item>4th menu item</Menu.Item>
        </SubMenu>
      </Menu>
    );

    return (
      <BasicLayout history={this.props.history}>
        <div>
          <Dropdown overlay={menu}>
            <Button style={{ marginLeft: 8 }}>
              操作选项
              <Icon type="down" />
            </Button>
          </Dropdown>

          <div>{this.props.children}</div>
        </div>
      </BasicLayout>
    );
  }
}

export default Manager;
