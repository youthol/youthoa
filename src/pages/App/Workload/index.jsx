import React, { Component } from 'react';
import { message } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import NewItemBtn from '@/components/NewItemBtn';
import DataList from './components/DataList';
import ModalAdd from './components/ModalAdd';
import ModalEdit from './components/ModalEdit';
import { getRecords, postRecord, putRecord, deleteRecord } from '@/api/workload';

class AppWorkload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalEditVisible: false,
      currentId: 0,
      workloadDetail: {}
    };
  }
  componentDidMount() {
    this.getWorkloadList();
  }
  showModal = (type, id) => {
    const workloadList = this.state.data;
    const workloadDetail = workloadList.filter(el => el.id === id);
    this.setState({ workloadDetail: workloadDetail[0] });
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
  handleOk = (type, form) => {
    form.validateFields((err, values) => {
      if (!err) {
        switch (type) {
          case 'add':
            this.createWorkload(values);
            this.setState({ modalAddVisible: false });
            break;
          case 'edit':
            this.upgradeWorkload(values);
            this.setState({ modalEditVisible: false, currentId: 0 });
            break;
          default:
            message.error('出现错误');
        }
      }
    });
  };
  handleCancel = (type, form) => {
    switch (type) {
      case 'add':
        this.setState({ modalAddVisible: false });
        break;
      case 'edit':
        this.setState({ modalEditVisible: false });
        break;
      default:
        message.error('出错啦~');
    }
    form.resetFields();
  };
  handleDelete = async id => {
    if (!id) return;
    await deleteRecord(id);
    this.getWorkloadList();
  };
  getWorkloadList = async () => {
    const rowData = await getRecords();
    this.setState({
      data: rowData.data.map(el => ({ ...el, key: el.id }))
    });
  };
  createWorkload = async data => {
    if (!data) return;
    await postRecord(data);
    this.getWorkloadList();
  };
  upgradeWorkload = async data => {
    if (!data) return;
    await putRecord(this.state.currentId, data);
    this.getWorkloadList();
  };
  render() {
    return (
      <BasicLayout>
        <NewItemBtn label="记录工作量" showModal={this.showModal} />
        <DataList
          data={this.state.data}
          showModal={this.showModal}
          handleDelete={this.handleDelete}
          handleExpandRow={this.handleExpandRow}
        />
        <ModalAdd
          visible={this.state.modalAddVisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
        <ModalEdit
          data={this.state.workloadDetail}
          visible={this.state.modalEditVisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </BasicLayout>
    );
  }
}

export default AppWorkload;
