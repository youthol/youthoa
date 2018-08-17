import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Form, message } from 'antd';
import DataList from '../../components/Schedule/DataList';
import BtnGroup from '../../components/Schedule/BtnGroup';
import ModalAdd from '../../components/Schedule/ModalAdd';
import ModalRenew from '../../components/Schedule/ModalRenew';

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
    this.getScheduleList();
  }
  getScheduleList = () => {
    fetch(`${this.props.baseUrl.localhost}schedules`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data.data
        });
      })
      .catch(err => console.log('错误:', err));
  };
  insertSchedule = data => {
    let payload = '';
    Object.keys(data).forEach(key => {
      payload += `&${key}=${data[key]}`;
    });
    fetch(`${this.props.baseUrl.localhost}schedules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload.substr(1)
    })
      .then(res => res.json())
      .then(data => {
        this.getScheduleList();
      })
      .catch(err => console.log('错误:', err));
  };
  upgradeSchedule = data => {
    let payload = '';
    Object.keys(data).forEach(key => {
      payload += `&${key}=${data[key]}`;
    });
    fetch(`${this.props.baseUrl.localhost}schedules/${this.state.upgradeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload.substr(1)
    })
      .then(res => res.json())
      .then(data => {
        this.getScheduleList();
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
        event_name: getFieldValue('event_name'),
        event_place: getFieldValue('event_place'),
        event_date: getFieldValue('event_date'),
        sponsor: getFieldValue('sponsor')
      };
    } else if (type === 'renew') {
      formData = {
        user: getFieldValue('user')
      };
    } else {
      message.error('出错啦~');
    }
    hasEmpty = Object.keys(formData).some(key => !formData[key]);
    if (hasEmpty) {
      message.error('请填完整后再提交~');
    } else {
      switch (type) {
        case 'add':
          formData.event_date = formData.event_date.format(
            'YYYY-MM-DD HH:mm:ss'
          );
          console.log(formData);
          this.insertSchedule(formData);
          this.setState({ modalAddVisible: false });
          break;
        case 'renew':
          console.log(formData);
          this.upgradeSchedule(formData);
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
  onChange = e => {
    console.log(e.target.value);
  };
  render() {
    return (
      <Content className="page__bd">
        <BtnGroup showModal={this.showModal} />
        <DataList data={this.state.data} showModal={this.showModal} />
        <ModalAdd
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
