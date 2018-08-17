import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Form, message } from 'antd';
import moment from 'moment';
import DataList from '../../components/Equipment/DataList';
import BtnGroup from '../../components/Equipment/BtnGroup';
import ModalAdd from '../../components/Equipment/ModalAdd';
import ModalRenew from '../../components/Equipment/ModalRenew';

const { Content } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalRenewVisible: false,
      upgradeId: 0
    };
  }
  componentDidMount() {
    this.getEquipmentList();
    this.getRecordList();
  }
  getEquipmentList = () => {
    fetch(`${this.props.baseUrl.localhost}equipments`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          equipments: data.data
        });
      })
      .catch(err => console.log('错误:', err));
  };
  getRecordList = () => {
    fetch(`${this.props.baseUrl.localhost}devices`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data.data
        });
      })
      .catch(err => console.log('错误:', err));
  };
  insertRecord = data => {
    let payload = '';
    Object.keys(data).forEach(key => {
      payload += `&${key}=${data[key]}`;
    });
    fetch(`${this.props.baseUrl.localhost}devices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload.substr(1)
    })
      .then(res => res.json())
      .then(data => {
        this.getRecordList();
        console.log(data);
      })
      .catch(err => console.log('错误:', err));
  };
  upgradeRecord = data => {
    let payload = '';
    Object.keys(data).forEach(key => {
      payload += `&${key}=${data[key]}`;
    });
    fetch(`${this.props.baseUrl.localhost}devices/${this.state.upgradeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload.substr(1)
    })
      .then(res => res.json())
      .then(data => {
        this.getRecordList();
        console.log(data);
      })
      .catch(err => console.log('错误:', err));
  };
  showModal = (type, id) => {
    switch (type) {
      case 'add':
        this.setState({ modalAddVisible: true });
        break;
      case 'renew':
        this.setState({ modalRenewVisible: true, upgradeId: id });
        break;
      default:
        message.error('出错啦~');
    }
  };
  handleOk = type => {
    const { getFieldValue, resetFields } = this.props.form;
    let formData, hasEmpty;
    // 获取表单数据
    if (type === 'add') {
      formData = {
        device: getFieldValue('device'),
        activity: getFieldValue('activity'),
        lend_at: getFieldValue('lend_at'),
        lend_user: getFieldValue('lend_user'),
        memo_user: getFieldValue('memo_user')
      };
    } else if (type === 'renew') {
      formData = {
        rememo_user: getFieldValue('rememo_user')
      };
    } else {
      message.error('出错啦~');
    }
    // 判断有无空值
    hasEmpty = Object.keys(formData).some(key => !formData[key]);
    if (hasEmpty) {
      message.error('请填完整后再提交~');
    } else {
      switch (type) {
        case 'add':
          formData.lend_at = formData.lend_at.format('YYYY-MM-DD HH:mm:ss');
          console.log(formData);
          this.insertRecord(formData);
          this.setState({ modalAddVisible: false });
          break;
        case 'renew':
          console.log(formData);
          this.upgradeRecord(formData);
          this.setState({ modalRenewVisible: false, upgradeId: 0 });
          break;
        default:
          message.error('出错啦~');
      }
    resetFields();
  }
  };
  handleCancel = type => {
    const { resetFields } = this.props.form;
    switch (type) {
      case 'add':
        this.setState({ modalAddVisible: false });
        break;
      case 'renew':
        this.setState({ modalRenewVisible: false });
        break;
      default:
        message.error('出错啦~');
    }
    resetFields();
  };
  handleDelete = e => {
    console.log('delete');
  };
  onChange = e => {
    console.log(e.target.value);
  };
  handleExpandRow = record => (
    <ul>
      {record.memo_user && <li>借出备忘人：{record.memo_user}</li>}
      {record.rememo_user && <li>归还备忘人：{record.rememo_user}</li>}
      {record.return_at && (
        <li>
          归还时间：{moment(record.return_at).format('YYYY-MM-DD HH:mm:ss')}
        </li>
      )}
    </ul>
  );
  render() {
    return (
      <Content className="page__bd">
        <BtnGroup showModal={this.showModal} />
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
          onChange={this.onChange}
          form={this.props.form}
        />
        <ModalRenew
          visible={this.state.modalRenewVisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          onChange={this.onChange}
          form={this.props.form}
        />
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Form.create()(Index));
