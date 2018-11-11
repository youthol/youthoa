import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon, Button } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

const SubMenu = Menu.SubMenu;

class Manager extends Component {
  handleExport = (e, form) => {
    e.preventDefault();
    const { baseUrl } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        let [start, end] = values.daterange;
        start = start.format('YYYY-MM-DD');
        end = end.format('YYYY-MM-DD');
        let a = document.createElement('a');
        let url = `${baseUrl}/signin/export?start=${start}&end=${end}`;
        let filename = 'myfile.zip';
        a.href = url;
        a.download = filename;
        a.click();
      }
    });
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/manage/expt-signin-rec-tb">导出签到表</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/manage/impt-user-tb">导入成员表</Link>
        </Menu.Item>
        <SubMenu title="sub menu">
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
