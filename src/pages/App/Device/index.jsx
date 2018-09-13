import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, message } from 'antd';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import NewItemBtn from '@/components/NewItemBtn';
import DataList from '@/components/Device/DataList';
import ModalAdd from '@/components/Device/ModalAdd';
import ModalRenew from '@/components/Device/ModalRenew';

class AppDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalRenewVisible: false,
      currentId: 0,
    };
  }
  componentDidMount() {
    this.getEquipmentList();
    this.getRecordList();
  }

  /**
   * @description 打开表单输入框
   * @param {*} type
   * @param {*} id
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
   * @description 处理表单框OK点击事件
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
          case 'renew':
            this.upgradeRecord(values);
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
   * @description 处理表单框Cancle点击事件
   * @param {*} type
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
        message.error('出错啦');
    }
    form.resetFields();
  };

  handleDelete = e => {
    console.log('delete');
  };

  /**
   * @description 获取全部可借用设备
   */
  getEquipmentList = () => {
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/equipments`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.setState({ equipments: res.data.data });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  /**
   * @description 获取近一个月借用记录
   */
  getRecordList = () => {
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/devices`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const data = res.data.data.map(el => ({
            ...el,
            key: el.id,
          }));
          this.setState({ data });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  /**
   * @description 创建借用记录
   * @param {*} data
   * @returns
   */
  createRecord = data => {
    if (!data) return;
    const params = qs.stringify(data);

    axios
      .post(`${this.props.baseUrl}/device`, params)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.getRecordList();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  /**
   * @description 更新状态
   * @param {*} data
   * @returns
   */
  upgradeRecord = data => {
    if (!data) return;
    const params = qs.stringify(data);
    axios
      .put(`${this.props.baseUrl}/device/${this.state.currentId}`, params)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.getRecordList();
        }
      })
      .catch(err => {
        console.error(err);
      });
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
      <BasicLayout history={this.props.history}>
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

export default connect(mapStateToProps)(Form.create()(AppDevice));
