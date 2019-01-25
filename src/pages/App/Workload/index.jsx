import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import NewItemBtn from '@/components/NewItemBtn';
import DataList from './components/DataList';
import ModalAdd from './components/ModalAdd';

class AppWorkload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalEditVisible: false,
      currentId: 0
    };
  }
  componentDidMount() {
    this.getWorkloadList();
  }
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
  handleOk = (type, form) => {
    form.validateFields((err, values) => {
      if (!err) {
        switch (type) {
          case 'add':
            console.log(values);
            this.createWorkload(values);
            this.setState({ modalAddVisible: false });
            break;
          case 'edit':
            console.log(values);
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
  handleDelete = id => {
    if (id) {
      this.deletePhoneBook(id);
    }
  };
  getWorkloadList = () => {
    const { BASE_API } = this.props;
    axios
      .get(`${BASE_API}/workloads`)
      .then(res => {
        console.log(res);
        if (res.status >= 200 && res.status <= 300) {
          this.setState({ data: res.data.data });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  createWorkload = data => {
    if (!data) return;
    const { BASE_API } = this.props;
    const { token } = sessionStorage;
    const params = qs.stringify(data);
    axios
      .post(`${BASE_API}/workload`, params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.getWorkloadList();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  upgradeWorkload = data => {
    if (!data) return;
    const { BASE_API } = this.props;
    const { token } = sessionStorage;
    const params = qs.stringify(data);
    axios
      .put(`${BASE_API}/workload/${this.state.currentId}`, params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.getWorkloadList();
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
  deleteWorkload = id => {
    if (!id) return;
    const { BASE_API } = this.props;
    const { token } = sessionStorage;
    axios
      .delete(`${BASE_API}/workload/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.getWorkloadList();
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
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API
});

export default connect(mapStateToProps)(AppWorkload);
