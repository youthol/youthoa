/**
 * @author Gsc
 * @file 个人账户 
 * 使用了多级路由
 */
// 电话薄
import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect, withRouter, Link } from 'react-router-dom';
import { Menu } from 'antd';

import store from '@/store'

import BasicLayout from '@/layouts/BasicLayout';
import Userinfo from './components/Userinfo'
import MySiginRecoard from './components/MySiginRecoard'
import ChangePass from './components/ChangePass'

class index extends Component {
    render() {
        return (
            <BasicLayout>
                <Menu mode="horizontal">
                    {
                        /**
                         * 管理员用户 userinfo 为空  没有用户信息, 没有签到记录
                         */
                    }
                    <Menu.Item><Link to="/account/info" />个人信息</Menu.Item>
                    <Menu.Item><Link to="/account/siginrecoard" />签到记录</Menu.Item>
                    <Menu.Item><Link to="/account/changepass" />修改密码</Menu.Item>
                </Menu>
                <Router>
                    <Switch>
                        <Route exact path="/account/info" component={Userinfo} />                    {/* 办公电话表 */}
                        <Route exact path="/account/siginrecoard" component={MySiginRecoard} />          {/* 导出办公电话表 */}
                        <Route exact path="/account/changepass" component={ChangePass} />          {/* 导入办公电话表 */}
                        <Redirect to="/account/info" />                                                           {/* 首页 */}
                    </Switch>
                </Router>
            </BasicLayout>
        )
    }
}


export default withRouter(index)