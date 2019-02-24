import React, { Component } from 'react';
import { message } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import NewItemBtn from '@/components/NewItemBtn';
import DataList from './components/DataList';
import ModalAdd from './components/ModalAdd';
import ModalEdit from './components/ModalEdit';
import { getSchedules, postSchedule, putSchedule } from '@/api/schedule';

class AppSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalEditVisible: false,
      currentId: 0
    };
  }

  componentDidMount() {
    this.getScheduleList();
  }

  /**
   * @description 显示 modal
   * @param {*} type 新增 add, 更新 edit
   * @param {*} id 更新的 id
   */
  showModal = (type, id) => {
    switch (type) {
      case 'add':
        this.setState({ modalAddVisible: true });
        break;
      case 'edit':
        this.setState({ modalEditVisible: true, currentId: id });
        break;
      default:
        message.error('出错啦~');
    }
  };

  /**
   * @description 处理 modal 确认事件
   * @param {*} type 新增 add, 更新 edit
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
          case 'edit':
            this.upgradeSchedule(values);
            this.setState({ modalEditVisible: false, currentId: 0 });
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
   * @param {*} type 新增 add, 更新 edit
   * @param {*} form
   */
  handleCancel = (type, form) => {
    switch (type) {
      case 'add':
        this.setState({ modalAddVisible: false });
        break;
      case 'edit':
        this.setState({ modalEditVisible: false });
        break;
      default:
        message.error('出现错误');
    }
    form.resetFields();
  };

  /**
   * @description 获取进一个月的日程记录
   */
  getScheduleList = async () => {
    const rowData = await getSchedules();
    this.setState({
      data: rowData.data.map(el => ({ ...el, key: el.id }))
    });
  };

  /**
   * @description 请求创建新的日程记录
   * @param {*} data
   * @returns
   */
  createSchedule = async data => {
    if (!data) return;
    await postSchedule(data);
    this.getScheduleList();
  };

  /**
   * @description 更新日程状态
   * @param {*} data
   * @returns
   */
  upgradeSchedule = async data => {
    if (!data) return;
    await putSchedule(this.state.currentId, data);
    this.getScheduleList();
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
        <ModalEdit
          visible={this.state.modalEditVisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </BasicLayout>
    );
  }
}

export default AppSchedule;
