/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import { getBirthday } from '../../api/birthday';
import { checkTime } from '../../lib/checkTime';
import './style.scss';
import moment from 'moment';
import { Modal, message } from 'antd';
import { getRecords, postSignin } from '@/api/signin';
import SigninInput from '../App/Signin/components/SigninInput';
import { weather } from '../../api/weather';
import Loading from '../../components/Loading';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      weather: '',
      birthday: '',
      LoadingState: true, // birthday 加载状况
    };
  }

  componentDidMount() {
    this.getBirthday();
    this.getWeather();
    this.getRecordList();
  }

  /**
   * @description 处理输入事件
   * @param {*} e
   */
  handleChange = e => {
    const inputValue = e.target.value;
    if (Number(inputValue)) {
      this.setState({ inputValue });
    }
  };

  /**
   * @description 处理提交事件
   * @param {*} val max length is 11
   * @returns
   */
  handleSubmit = value => {
    if (!value || value.length !== 11) {
      return message.error('请输入正确学号');
    }
    const user = this.state.data.filter(el => el.sdut_id === value && el.status === 0);
    const timer = 77;
    if (
      user.length &&
      moment()
        .add(-timer, 'minutes')
        .isBefore(user[0].created_at)
    ) {
      Modal.confirm({
        title: '确定要签退吗?',
        content: '现在签退是早退喔~',
        onOk: () => {
          this.postSignin(value);
        }
      });
    } else {
      this.postSignin(value);
    }
    this.setState({ inputValue: '' });
  };

  /**
   * @description 异步请求当天所有签到数据
   */
  getRecordList = async () => {
    const rowData = await getRecords();
    const data = rowData.data.map(el => ({ ...el, key: el.id }));
    this.setState({ data });
  };

  /**
   * @description 异步发送签到数据
   * @param {*} id sdut identity
   * @returns
   */
  postSignin = async id => {
    if (!id) return;
    const rowData = await postSignin({ sdut_id: id });
    const { status, user } = rowData.data;
    switch (status) {
      case 0:
        message.success(`${user.name} 签到成功`);
        break;
      default:
        message.success(`${user.name} 已签退`);
    }
    this.getRecordList();
  };

  /**
   * 异步获取是否有人过生日
   */
  getBirthday = async () => {
    const data = await getBirthday();
    if (data) {
      this.setState({
        birthday: data.data.msg,
        LoadingState: false
      });
    }
  };

  getWeather = async () => {
    const data = await weather();
    console.log(data);
    if (data) {
      this.setState({
        weather: {
          tem: data.tem, //当前温度
          city: data.city, //城市名
          wea: data.wea, //天气状况
          tem1: data.tem1, //最高温度
          tem2: data.tem2, //最低温度
          win_speed: data.win_speed, //风速
          win: data.win, //风向
          air_level: data.air_level //空气状况
        }
      });
    }
  };

  render() {
    const { tem, city, wea, win_speed, win } = this.state.weather;
    return (
      <BasicLayout>
        {!this.state.LoadingState ? (
          <div style={{ textAlign: 'center' }}>
            <div className="home-weather">
              {!this.state.weather ? null : `${city} ${wea} ${tem}℃ ${win_speed}${win}`}
            </div>
            <h1 className="main-title">{checkTime() + '好哟'}</h1>
            <p className="birthday">{this.state.birthday ? this.state.birthday : null}</p>
            <SigninInput
              inputValue={this.state.inputValue}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              className="home-input"
              xs={20}
              md={12}
              lg={10}
              xl={8}
              justify="center"
            />
          </div>
        ) : (
          <Loading className="home-loading" />
        )}
      </BasicLayout>
    );
  }
}

export default Home;
