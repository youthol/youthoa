import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Button } from "antd";
import BasicLayout from "@/layouts/BasicLayout";

const SubMenu = Menu.SubMenu;

class Manager extends Component {
  render() {
    const menu = (
      <Menu>
        <SubMenu title="用户/角色/权限管理">
          <SubMenu title="用户管理">
            <Menu.Item>
              <Link to="/users/import">导入用户表</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/users/export">导出用户表</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/users/add">新增用户</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu title="角色管理">
            <Menu.Item>
              <Link to="/roles/export">导出角色表</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/roles/add">新增角色</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu title="权限管理">
            <Menu.Item>
              <Link to="/prems/export">导出权限表</Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <Menu.Item>
          <Link to="/signin/export">导出签到表</Link>
        </Menu.Item>
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
