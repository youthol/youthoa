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
      currentId: 0
    };
  }
  componentDidMount() {
    this.getEquipmentList();
    this.getRecordList();
  }
  getEquipmentList = () => {
    axios
      .get(`${this.props.baseUrl}/equipments`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.setState({ equipments: res.data.data });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  getRecordList = () => {
    axios
      .get(`${this.props.baseUrl}/devices`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.setState({ data: res.data.data });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  createRecord = data => {
    if (!data) return;
    const params = qs.stringify(data);
    axios
      .post(`${this.props.baseUrl}/devices`, params)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.getRecordList();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  upgradeRecord = data => {
    if (!data) return;
    const params = qs.stringify(data);
    axios
      .put(`${this.props.baseUrl}/devices/${this.state.currentId}`, params)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.getRecordList();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
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
  handleOk = (type, form) => {
    form.validateFields((err, values) => {
      if (!err) {
        switch (type) {
          case 'add':
            values.lend_at = values.lend_at.format('YYYY-MM-DD HH:mm:ss');
            this.createRecord(values);
            console.log(values);
            this.setState({ modalAddVisible: false });
            break;
          case 'renew':
            console.log(values);
            this.upgradeRecord(values);
            this.setState({ modalRenewVisible: false, currentId: 0 });
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
  handleExpandRow = record => (
    <ul>
      {record.memo_user && (
        <li>
          借出备忘人：
          {record.memo_user}
        </li>
      )}
      {record.rememo_user && (
        <li>
          归还备忘人：
          {record.rememo_user}
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
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Form.create()(AppDevice));
