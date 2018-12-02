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
      currentId: 0
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
            this.createSchedule(values);
            this.setState({ modalAddVisible: false });
            break;
          case 'renew':
            this.upgradeSchedule(values);
            this.setState({ modalRenewVisible: false, currentId: 0 });
            break;
          default:
            message.error('出现错误');
        }
      }
    });
    form.resetFields();
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

  /**
   * @description 获取进一个月的日程记录
   */
  getScheduleList = () => {
    const { BASE_API } = this.props;

    axios
      .get(`${BASE_API}/schedules`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const data = res.data.data.map(el => ({
            ...el,
            key: el.id
          }));
          this.setState({ data });
        }
      })
      .catch(err => {
        try {
          const { errors } = err.response.data;
          if (errors) {
            for (let error in errors) {
              if (errors[error] instanceof Array) {
                errors[error].forEach(el => message.error(el));
              }
            }
          } else {
            message.error(err.response.data.message);
          }
        } catch (e) {
          console.error(e);
        }
      });
  };

  /**
   * @description 请求创建新的日程记录
   * @param {*} data
   * @returns
   */
  createSchedule = data => {
    if (!data) return;
    const { BASE_API } = this.props;
    const params = qs.stringify(data);

    axios
      .post(`${BASE_API}/schedule`, params)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.getScheduleList();
        }
      })
      .catch(err => {
        try {
          const { errors } = err.response.data;
          if (errors) {
            for (let error in errors) {
              if (errors[error] instanceof Array) {
                errors[error].forEach(el => message.error(el));
              }
            }
          } else {
            message.error(err.response.data.message);
          }
        } catch (e) {
          console.error(e);
        }
      });
  };

  /**
   * @description 更新日程，标注为已完成状态
   * @param {*} data
   * @returns
   */
  upgradeSchedule = data => {
    if (!data) return;
    const params = qs.stringify(data);
    axios
      .put(`${this.props.BASE_API}/schedule/${this.state.currentId}`, params)
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
      <BasicLayout>
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
  BASE_API: state.globalData.BASE_API
});

export default connect(mapStateToProps)(AppSchedule);
