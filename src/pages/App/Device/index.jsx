import React, { Component } from 'react';
import { Form, message } from 'antd';
import moment from 'moment';
import BasicLayout from '@/layouts/BasicLayout';
import NewItemBtn from '@/components/NewItemBtn';
import DataList from './components/DataList';
import ModalAdd from './components/ModalAdd';
import ModalEdit from './components/ModalEdit';
import { getEquipments, getRecords, postRecord, putRecord, deleteRecord } from '@/api/device';

class AppDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalEditVisible: false,
      currentId: 0
    };
  }
  componentDidMount() {
    this.initData();
  }

  /**
   * @description 显示输入框
   * @param {*} type
   * @param {*} id
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
   * @description 处理创建或更新提交事件
   * @param {*} type
   * @param {*} form
   */
  handleOk = (type, form) => {
    form.validateFields((err, values) => {
      if (!err) {
        switch (type) {
          case 'add':
            values.lend_at = values.lend_at.format('YYYY-MM-DD HH:mm:ss');
            this.createRecord(values);
            this.setState({ modalAddVisible: false });
            break;
          case 'edit':
            this.upgradeRecord(values);
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
   * @description 隐藏输入框
   * @param {*} type
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
        message.error('出错啦');
    }
    form.resetFields();
  };

  handleDelete = async id => {
    if (!id) return;
    await deleteRecord(id);
    this.initData();
  };

  /**
   * @description 初始化数据，获取可借用设备列表和借用记录
   */
  initData = async () => {
    const equipments = await getEquipments();
    const records = await getRecords();
    this.setState({
      equipments: equipments.data,
      data: records.data.map(el => ({ ...el, key: el.id }))
    });
  };
  /**
   * @description 创建借用记录
   * @param {*} data
   * @returns
   */
  createRecord = async data => {
    if (!data) return;
    await postRecord(data);
    const rowData = await getRecords();
    this.setState({ data: rowData.data.map(el => ({ ...el, key: el.id })) });
  };

  /**
   * @description 更新借用记录
   * @param {*} data
   * @returns
   */
  upgradeRecord = async data => {
    if (!data) return;
    await putRecord(this.state.currentId, data);
    const rowData = await getRecords();
    this.setState({ data: rowData.data.map(el => ({ ...el, key: el.id })) });
  };

  /**
   * @description 处理展开事件
   * @param {*} record
   */
  handleExpandRow = record => (
    <ul>
      {record.memo_user && (
        <li>
          借出备忘人：
          {record.memo_user_name.name}
        </li>
      )}
      {record.rememo_user && (
        <li>
          归还备忘人：
          {record.rememo_user_name.name}
        </li>
      )}
      {record.return_at && (
        <li>
          归还时间：
          {moment(record.return_at).format('YYYY-MM-DD HH:mm:ss')}
        </li>
      )}
    </ul>
  );

  render() {
    return (
      <BasicLayout>
        <NewItemBtn label="借用设备" showModal={this.showModal} />
        <DataList
          data={this.state.data}
          showModal={this.showModal}
          handleDelete={this.handleDelete}
          handleExpandRow={this.handleExpandRow}
        />
        <ModalAdd
          equipments={this.state.equipments}
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

export default Form.create()(AppDevice);
