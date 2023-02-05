/**
 * @file  从store中读取用户数据 展示用户数据
 * @author Gsc
 */

import React, { Component } from 'react';
import { Descriptions, Tag, Icon, Button } from 'antd';
import store from '@/store';


const { currentUser } = store.getState();
let { userinfo, roles } = currentUser;
/**
 * 周数展示名称
 */
let week_str = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
/**
 * 时间段展示名称
 */
let timeperiod_showname = ['', '一二节', '三四节', '五六节', '七八节', '九十节'];


/**
  * 值班时间字符串转 对象数组
  * @param {string} duty_at_str - 值班时间
  * @example  "0:3|0:4"
  * @returns  {object} 阿斯蒂芬
  * @example 
  * [
  *   {
  *       "day_at": "0",
  *       "time_at": "3",
  *       "showname": "周一五六节"
  *   },
  *]
  */
let deal_duty = (
  duty_at_str) => {
  //
  let duty_strs = duty_at_str.split('|');
  let dutys_obj = duty_strs.map((item) => {
    let duty_arr = item.split(':');
    let bb = {
      day_at: duty_arr[0],
      time_at: duty_arr[1],
      showname: week_str[duty_arr[0]] + timeperiod_showname[duty_arr[1]],
    };
    return bb;
  });
  return dutys_obj;
};
/**
 * 展示 store 中的用户信息
 */
export default class Userinfo extends Component {
  /**
  * 刷新state, 从而刷新界面
  * 此界面 刷新会导致 取不到 state, 刷新state
  * render 重新执行 就能获取到state
  */
  fresh = () => {
    this.setState({});
    let state = store.getState()
    if (state) {
      let a = state.currentUser
      if (a) {
        userinfo = a.userinfo;
        roles = a.roles
      }
    }
  };

  /**
   * 无数据时展示的dom数据
   * 
   */
  emptyDom = (<div>无数据( 超级管理员 无数据为 正常现象)<Button onClick={this.fresh}>刷新<Icon type="sync" /></Button></div>)

  render() {

    /**
    * 待渲染的dom 
    * @default this.domNodata 空数据时的 dom
    */
    let dom = this.emptyDom

    // 若用户数据存在 渲染新的 dom
    if (userinfo) {
      dom = (
        <Descriptions title="成员信息">
          <Descriptions.Item label="姓名">{userinfo.name}</Descriptions.Item>
          <Descriptions.Item label="学号">{userinfo.sdut_id}</Descriptions.Item>
          <Descriptions.Item label="联系方式">{userinfo.phone}</Descriptions.Item>
          <Descriptions.Item label="部门">{userinfo.department}</Descriptions.Item>
          <Descriptions.Item label="年级">{userinfo.grade}</Descriptions.Item>
          <Descriptions.Item label="出生日期"> {userinfo.birthday}</Descriptions.Item>

          <Descriptions.Item label="角色">
            {
              /**
              * 便利用户身份, 渲染身份标签
              * 
              */
              roles.map((role) => {
                return (<Tag color="green" key={role.id}>{role.display_name}</Tag>)
              })
            }
          </Descriptions.Item>

          <Descriptions.Item label="值班时间">
            {
              /**
               * 转换值班信息为数组 便利数组渲染 值班标签
               */
              deal_duty(userinfo.duty_at).map((item, index) => {
                return (<Tag color="green" key={index}>{item.showname}</Tag>)
              })
            }
          </Descriptions.Item>

        </Descriptions>

      )
    }

    return dom;
  }
}
