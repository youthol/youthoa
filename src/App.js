import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotMatch from '@/pages/404';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Users from '@/pages/Auth/Users';
import UserAdd from '@/pages/Auth/Users/Add';
import UserEdit from '@/pages/Auth/Users/Edit';
import ImportUsersTable from '@/pages/Auth/Users/Import';
import Roles from '@/pages/Auth/Roles';
import RoleAdd from '@/pages/Auth/Roles/Add';
import RoleEdit from '@/pages/Auth/Roles/Edit';
import Perms from '@/pages/Auth/Perms';
import PermEdit from '@/pages/Auth/Perms/Edit';
import Manages from '@/pages/Manager';
import ExportSigninTable from '@/pages/Manager/ExportSigninTable';
import ImportHygieneTable from '@/pages/Manager/ImportHygieneTable';
import DeleteHygiene from '@/pages/Manager/DeleteHygiene';
import EquipmentManager from '@/pages/Manager/EquipmentManager';
import ExportPhoneBook from '@/pages/Manager/ExportPhoneBook';
import ImportPhoneBook from '@/pages/Manager/ImportPhoneBook';
import AppSignin from '@/pages/App/Signin';
import AppDevice from '@/pages/App/Device';
import AppSchedule from '@/pages/App/Schedule';
import AppWorkload from '@/pages/App/Workload';
import AppPhonebook from '@/pages/App/Phonebook';
import './scss/base.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* Basic Routes */}
          <Route exact path="/" component={Home} />
          {/* Auth Routes */}
          <Route exact path="/login" component={Login} />                               {/* 登录 */}
          <Route exact path="/users" component={Users} />                               {/* 用户列表 */}
          <Route exact path="/users/import" component={ImportUsersTable} />             {/* 导入用户 */}
          <Route exact path="/users/add" component={UserAdd} />                         {/* 添加用户 */}
          <Route exact path="/users/edit/:id" component={UserEdit} />                   {/* 编辑用户 */}
          <Route exact path="/roles" component={Roles} />                               {/* 角色列表 */}
          <Route exact path="/roles/add" component={RoleAdd} />                         {/* 新增角色 */}
          <Route exact path="/roles/edit/:id" component={RoleEdit} />                   {/* 编辑角色 */}
          <Route exact path="/perms" component={Perms} />                               {/* 权限列表 */}
          <Route exact path="/perms/edit/:id" component={PermEdit} />                   {/* 权限修改 */}
          {/* Manages Routes */}
          <Route  path="/manage" component={Manages} />                            {/* 管理 系统数据管理 */}
          <Route  path="/manage/impt-hygiene-tb" component={ImportHygieneTable} /> {/* 导入卫生表 */}
          <Route  path="/manage/del-hygiene" component={DeleteHygiene} />          {/* 删除卫生成绩 */}
          <Route  path="/manage/device" component={EquipmentManager} />          {/* 删除卫生成绩 */}
          {/* Features Routes */} 
          <Route exact path="/signin" component={AppSignin} />                          {/* 签到界面    */}
          <Route exact path="/signin/export" component={ExportSigninTable} />           {/* 导出签到信息 */}
          <Route exact path="/device" component={AppDevice} />                          {/* 设备借用  */}
          <Route exact path="/schedule" component={AppSchedule} />                      {/* 时间表 日程安排 */}
          <Route exact path="/workload" component={AppWorkload} />                      {/* 工作量统计 */}
          <Route exact path="/phonebook" component={AppPhonebook} />                    {/* 办公电话表 */}
          <Route exact path="/phonebook/export" component={ExportPhoneBook} />          {/* 导出办公电话表 */}
          <Route exact path="/phonebook/import" component={ImportPhoneBook} />          {/* 导入办公电话表 */}
          {/* NotMatch Routes */}
          <Redirect to="/" />                                                           {/* 首页 */}
          <Route component={NotMatch} />                                                {/* 404界面 */}
        </Switch>
      </Router>
    );
  }
}

export default App;
