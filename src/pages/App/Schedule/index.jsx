import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import DataList from '@/components/Schedule/DataList';
import NewItemBtn from '@/components/NewItemBtn';
import ModalAdd from '@/components/Schedule/ModalAdd';
import ModalRenew from '@/components/Schedule/ModalRenew';

class AppSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalRenewVisible: false,
      currentId: 0,
    };
  }

  componentDidMount() {
    this.getScheduleList();
  }

  /**
   * @description 显示 modal
   * @param {*} type 新增 add, 更新 renew
   * @param {*} id 更新的 id
   */
  showModal = (type, id) => {
    switch (type) {
      case 'add':
        this.setState({ modalAddVisible: true });
        break;
      case 'renew':
        this.setState({ modalRenewVisible: true, currentId: id });
        break;
      default:
        message.error('出错啦~');
    }
  };

  /**
   * @description 处理 modal 确认事件
   * @param {*} type 新增 add, 更新 renew
   * @param {*} form
   */
  handleOk = (type, form) => {
    form.validateFields((err, values) => {
      if (!err) {
        switch (type) {
          case 'add':
            values.event_date = values.event_date.format('YYYY-MM-DD HH:mm:ss');
            console.log(values);
            this.createSchedule(values);
            this.setState({ modalAddVisible: false });
            break;
          case 'renew':
            console.log(values);
            this.upgradeSchedule(values);
            this.setState({ modalRenewVisible: false, currentId: 0 });
            break;
          default:
            message.error('出现错误');
        }
      }
    });
  };
  
  /**
   * @description 处理 modal 取消事件
   * @param {*} type 新增 add, 更新 renew
   * @param {*} form
   */
  handleCancel = (type, form) => {
    switch (type) {
      case 'add':
        this.setState({ modalAddVisible: false });
        break;
      case 'renew':
        this.setState({ modalRenewVisible: false });
        break;
      default:
        message.error('出现错误');
    }
    form.resetFields();
  };
  getScheduleList = () => {
    axios
      .get(`${this.props.baseUrl}/schedules`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.setState({ data: res.data.data });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  createSchedule = data => {
    if (!data) return;
    const params = qs.stringify(data);
    axios
      .post(`${this.props.baseUrl}/schedules`, params)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.getScheduleList();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  upgradeSchedule = data => {
    if (!data) return;
    const params = qs.stringify(data);
    axios
      .put(`${this.props.baseUrl}/schedules/${this.state.currentId}`, params)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.getScheduleList();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <BasicLayout history={this.props.history}>
        <NewItemBtn label="新增日程" showModal={this.showModal} />
        <DataList data={this.state.data} showModal={this.showModal} />
        <ModalAdd
          visible={this.state.modalAddVisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
        <ModalRenew
          visible={this.state.modalRenewVisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl,
});

export default connect(mapStateToProps)(AppSchedule);
