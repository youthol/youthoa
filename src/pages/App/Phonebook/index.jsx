import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import DataList from './components/DataList';
import ModalEdit from './components/ModalEdit';
import SearchDrawer from './components/SearchDrawer';
import { getPhonebooks, putPhonebook, deletePhonebook } from '@/api/phonebook';

class AppPhoneBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalEditVisible: false,
      searchDrawerVisible: false,
      upgradeId: 0,
      phoneDetail: {}
    };
  }
  componentDidMount() {
    this.getPhoneBookList();
  }
  showModal = (type, id) => {
    const phoneBookList = this.state.data;
    const phoneDetail = phoneBookList.filter(el => el.id === id);
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
  toggleDrawer = () => {
    this.setState({
      searchDrawerVisible: !this.state.searchDrawerVisible
    });
  };
  handleOk = (type, form) => {
    form.validateFields((err, values) => {
      if (!err) {
        switch (type) {
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
  handleDelete = async id => {
    if (!id) return;
    await deletePhonebook(id);
    this.getPhoneBookList();
  };
  getPhoneBookList = async () => {
    const rowData = await getPhonebooks();
    this.setState({ data: rowData.data.map(el => ({ ...el, key: el.id })) });
  };
  upgradePhoneBook = async data => {
    if (!data) return;
    await putPhonebook(this.state.currentId, data);
    this.getPhoneBookList();
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
