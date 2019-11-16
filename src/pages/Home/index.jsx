import React, { Component } from 'react';
//import { Spin } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { getRecords } from '@/api/signin';
import swal from 'sweetalert';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duty: [],
      PresentTime: null,
      data:[],
      cols: {
        time: { alias: '值班时常' },
        genre: { alias: '值班人员' }
      }
    };
  }
  componentDidMount() {
    this.getRecordList();
    // swal("hello")
  }
    /**
   * @description 异步请求当天所有签到数据
   */
  getRecordList = async () => {
    const rowData = await getRecords();
    const test1 = rowData.data;
    var today = new Date();
    var strin = today.toLocaleString("chinese", { hour12: false });
    var time2 = new Date(strin).getTime();
    for (var i = 0; i < test1.length; i++) {
      if (test1[i].status === 0) {
        const name = test1[i].user.name;
        const result = test1[i].created_at;
        var time = new Date(result).getTime();
        const calu = (time2 - time) / 1000 / 60 / 60;
        // 此处将love和loveName写为两个对象，并想办法将值班时常与名字导入数组中，但还没完成这个想法
        const love = {genre: name , time: calu.toFixed(0)};
        this.state.duty.push(love);
      }
    }

    this.setState({
      PresentTime: time
    }); 
  };
  render() {
    return (
      <BasicLayout>
        <div style={{ textAlign: 'center' }}>
         
          <Chart width={600} height={400} data={this.state.duty} scale={this.state.cols}>
            <Axis name="genre" title />
            <Axis name="time" title />
            <Legend position="top" dy={-20} />
            <Tooltip />
            <Geom type="interval" position="genre*time" color="genre" />
          </Chart>
         
        </div>
      </BasicLayout>
    );
  }
}

export default Home;
