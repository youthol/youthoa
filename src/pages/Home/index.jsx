/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Component } from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import { getBirthday } from '../../api/birthday';
import { checkTime } from '../../lib/checkTime';
import './style.scss';
import moment from 'moment';
import { Modal, message } from 'antd';
import { getRecords, postSignin } from '@/api/signin';
import SigninInput from '../../components/SigninInput';
import { weather } from '../../api/weather';
import Loading from '../../components/Loading';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { getRecords } from '@/api/signin';
import swal from 'sweetalert';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      weather: '',
      birthday: '',
      LoadingState: true, // birthday 加载状况
      duty: [],
      PresentTime: null,
      data: [],
      cols: {
        time: { alias: '值班时常' },
        genre: { alias: '值班人员' }
      }
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
    } else if (Number(this.state.inputValue)) {
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
    if (!this.state.data) {
      message.error('服务器错误，请检查网络是否正常！');
      return;
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
        },
        okText: '确认',
        cancelText: '取消'
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

    if (rowData) {
      const data = rowData.data.map(el => ({ ...el, key: el.id }));
      this.setState({ data });
      var today = new Date();
      var strin = today.toLocaleString('chinese', { hour12: false });
      var time2 = new Date(strin).getTime();
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === 0) {
          const name = data[i].user.name;
          const result = data[i].created_at;
          var time = new Date(result).getTime();
          const calu = (time2 - time) / 1000 / 60 / 60;
          // 此处将love和loveName写为两个对象，并想办法将值班时常与名字导入数组中，但还没完成这个想法
          const love = { genre: name, time: calu.toFixed(0) };
          this.state.duty.push(love);
        }
      }

      this.setState({
        PresentTime: time
      });
    }
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
    this.setState({
      LoadingState: false
    });
  };

  getWeather = async () => {
    const data = await weather();
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
              {!this.state.weather ? null : `${city} ${wea} ${tem}℃ ${win}${win_speed}`}
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
            <Chart width={600} height={400} data={this.state.duty} scale={this.state.cols}>
              <Axis name="genre" title />
              <Axis name="time" title />
              <Legend position="top" dy={-20} />
              <Tooltip />
              <Geom type="interval" position="genre*time" color="genre" />
            </Chart>
          </div>
        ) : (
          <Loading className="home-loading" />
        )}
      </BasicLayout>
    );
  }
}

export default Home;
