import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import NewItemBtn from '@/components/NewItemBtn';
import DataList from './components/DataList';
import ModalEdit from './components/ModalEdit';
import SearchDrawer from './components/SearchDrawer';

class AppPhoneBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalEditVisible: false,
      searchDrawerVisible: false,
      upgradeId: 0,
      phoneDetail: {},
      searchText: ''
    };
  }
  componentDidMount() {
    this.getPhoneBookList();
  }
  showModal = (type, id) => {
    const phoneBookList = this.state.data;
    const phoneDetail = phoneBookList.filter(item => item.id === id);
    this.setState({ phoneDetail: phoneDetail[0] });
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
  toggleDrawer = e => {
    this.setState({
      searchDrawerVisible: !this.state.searchDrawerVisible
    });
  };
  handleOk = (type, form) => {
    form.validateFields((err, values) => {
      if (!err) {
        switch (type) {
          case 'add':
            this.createSchedule(values);
            this.setState({ modalAddVisible: false });
            break;
          case 'edit':
            this.upgradePhoneBook(values);
            this.setState({ modalEditVisible: false, currentId: 0 });
            break;
          default:
            message.error('出现错误');
        }
      }
    });
    form.resetFields();
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
        message.error('出现错误');
    }
    form.resetFields();
  };
  handleDelete = id => {
    if (id) {
      this.deletePhoneBook(id);
    }
  };
  getPhoneBookList = () => {
    axios
      .get(`${this.props.BASE_API}/phonebooks`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const data = res.data.data.map(el => ({ ...el, key: el.id }));
          this.setState({ data });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  upgradePhoneBook = data => {
    if (!data) return;
    const params = qs.stringify(data);
    const { token } = sessionStorage;
    axios
      .put(`${this.props.BASE_API}/phonebook/${this.state.currentId}`, params, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.getPhoneBookList();
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
  deletePhoneBook = id => {
    if (!id) return;
    const { BASE_API } = this.props;
    const { token } = sessionStorage;
    axios
      .delete(`${BASE_API}/phonebook/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        this.getPhoneBookList();
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
        <DataList
          data={this.state.data}
          showModal={this.showModal}
          handleDelete={this.handleDelete}
        />
        <Button type="primary" icon="search" onClick={this.toggleDrawer}>
          查询
        </Button>
        <ModalEdit
          data={this.state.phoneDetail}
          visible={this.state.modalEditVisible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
        <SearchDrawer
          data={this.state.data}
          visible={this.state.searchDrawerVisible}
          onClose={this.toggleDrawer}
        />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API
});

export default connect(mapStateToProps)(AppPhoneBook);
