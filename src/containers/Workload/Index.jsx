import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Form, message } from 'antd';
import DataList from '../../components/Workload/DataList';
import BtnGroup from '../../components/Workload/BtnGroup';
import ModalAdd from '../../components/Workload/ModalAdd';

const { Content } = Layout;

const data = [];
for (let i = 1; i <= 11; i++) {
  data.push({
    key: i,
    name: `张三`,
    department: `程序部`,
    description: `迎新专题`,
    wk_count: 30,
    manager: '李四',
    created_at: '2018-06-25 12:34:43',
    updated_at: '2018-06-25 12:34:43'
  });
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalRenewVisible: false,
      upgradeId: 0,
      searchText: ''
    };
  }
  componentDidMount() {
    this.getWorkloadList();
  }
  getWorkloadList = () => {
    fetch(`${this.props.baseUrl.localhost}workloads`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          data: data.data
        });
      })
      .catch(err => console.log('错误:', err));
  };
  insertWorkload = data => {
    let payload = '';
    Object.keys(data).forEach(key => {
      payload += `&${key}=${data[key]}`;
    });
    fetch(`${this.props.baseUrl.localhost}workloads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload.substr(1)
    })
      .then(res => res.json())
      .then(data => {
        this.getWorkloadList();
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
        name: getFieldValue('name'),
        description: getFieldValue('description'),
        wk_count: getFieldValue('wk_count'),
        manager: getFieldValue('manager')
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
          console.log(formData);
          this.insertWorkload(formData);
          this.setState({ modalAddVisible: false });
          break;
        case 'renew':
          console.log(formData);
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
          visible={this.state.modalAddVisible}
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
