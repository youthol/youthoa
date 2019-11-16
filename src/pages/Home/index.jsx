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
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import { getTimeDifference } from '../../lib/getTimeDifference';
import { compareArr } from '../../lib/compareArr';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      weather: '',
      birthday: '',
      LoadingState: true, // birthday 加载状况
      duty: [], // 柱状图数据
      cols: {
        time: { alias: '值班时长' },
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
      console.log(data);

      const localTimestamp = new Date().getTime(); // 当前时间戳
      let duty = [];

      for (let i = 0; i < data.length; i++) {
        const sdut_id = data[i].sdut_id;
        const name = data[i].user.name;
        let timeDifference = 0;
        if (data[i].status === 4) {
          // 已签退，本轮值班结束
          const startTimestamp = new Date(data[i].created_at).getTime(); // 签到时间戳
          const endTimestamp = new Date(data[i].updated_at).getTime(); // 签退时间戳
          timeDifference = getTimeDifference(startTimestamp, endTimestamp); // 值班时间差
        } else if (data[i].status === 0) {
          // 未签退，当前轮值班未结束
          const startTimestamp = new Date(data[i].created_at).getTime(); // 开始签到时间戳
          timeDifference = getTimeDifference(startTimestamp, localTimestamp);
        }
        // 检查duty是否存在该用户，如果存在则叠加值班时长
        let isExist = 0;
        for (let i = 0; i < duty.length; i++) {
          if (duty[i].sdut_id === sdut_id) {
            isExist = 1;
            duty[i].time += timeDifference;
          } else {
            continue;
          }
        }
        // 如果不存在则添加进去
        if (!isExist) {
          duty = [...duty, { sdut_id, genre: name, time: timeDifference }];
        }
      }

      // 排序
      duty.sort(compareArr('time'));
      // 截取值班时长前5位
      if (duty.length >= 6) {
        duty.length = 5;
      }

      this.setState({
        duty
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
            <Chart
              width={600}
              height={300}
              data={this.state.duty}
              scale={this.state.cols}
              className="home-chart"
            >
              <Axis name="genre" title />
              <Axis
                name="time"
                title
                label={{
                  formatter(text) {
                    return `${text}m`;
                  }
                }}
              />
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
