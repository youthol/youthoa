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

import AppSignin from '@/pages/App/Signin';
import AppDevice from '@/pages/App/Device';
import AppSchedule from '@/pages/App/Schedule';
import AppWorkload from '@/pages/App/Workload';
import AppPhonebook from '@/pages/App/Phonebook';

import Manages from '@/pages/Manager';
import ExportSigninTable from '@/pages/Manager/ExportSigninTable';
import ImportHygieneTable from '@/pages/Manager/ImportHygieneTable';
import DeleteHygiene from '@/pages/Manager/DeleteHygiene';
import EquipmentManager from '@/pages/Manager/EquipmentManager';
import ExportPhoneBook from '@/pages/Manager/ExportPhoneBook';
import ImportPhoneBook from '@/pages/Manager/ImportPhoneBook';

import ManageEquipment from '@/pages/Manager/Equipment'       // 设备管理管理
import ManageEquipmentAdd from '@/pages/Manager/Equipment/Add.jsx'       // 设备管理管理
import ManageSigninRecoard from '@/pages/Manager/SigninRecoard'   // 签到记录管理
import ManageDevice from '@/pages/Manager/Device'          // 设备借用记录管理
import ManageWorkload from '@/pages/Manager/Workload'   // 工作量数据管理
import ManageSchedule from '@/pages/Manager/Schedule'        // 日程安排数据管理
import ManagePhonebook from '@/pages/Manager/PhoneBook/index.jsx'       // 办公电话数据管理

import Account from "@/pages/Auth/Account"

import './scss/base.scss';
/**
 * 
 */
class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/account" component={Account} />

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
          <Route exact path="/manage" component={Manages} />                            {/* 管理 系统数据管理 */}
          <Route exact path="/manage/impt-hygiene-tb" component={ImportHygieneTable} /> {/* 导入卫生表 */}
          <Route exact path="/manage/del-hygiene" component={DeleteHygiene} />          {/* 删除卫生成绩 */}


          <Route exact path="/manage/equipment" component={ManageEquipment} />          {/* 设备管理管理 */}
          <Route exact path="/manage/equipment/add" component={ManageEquipmentAdd} />          {/* 设备管理管理 */}
          <Route exact path="/manage/siginrecoard" component={ManageSigninRecoard} />          {/* 签到记录管理 */}
          <Route exact path="/manage/device" component={ManageDevice} />          {/* 设备借用记录管理 */}
          <Route exact path="/manage/workload" component={ManageWorkload} />          {/* 工作量数据管理 */}
          <Route exact path="/manage/schedulee" component={ManageSchedule} />          {/* 日程安排数据管理 */}
          <Route exact path="/manage/phonebook" component={ManagePhonebook} />          {/* 办公电话数据管理  */}


          {/* 
            import ManageEquipment from                                 '@/pages/Manager/Equipment'       // 设备管理管理
            import ManageSigninRecoard from                             '@/pages/Manager/SigninRecoard'   // 签到记录管理
            import ManageDevice from                                    '@/pages/Manager/Device'          // 设备借用记录管理
            import ManageWorkload from                                  '@/pages/Manager/Workload'        // 工作量数据管理
            import ManageSchedule from                                  '@/pages/Manager/Schedule'        // 日程安排数据管理
            import ManagePhonebook from                                 '@/pages/Manager/Phonebook'       // 办公电话数据管理 
        */}


          3
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
