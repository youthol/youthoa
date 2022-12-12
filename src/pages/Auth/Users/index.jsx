import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import UserList from '@/components/Auth/UserList';
import OptsBtnGroup from '@/components/Auth/OptsBtnGroup';
import SearchDrawer from './SearchDrawer';
import { getUsers, deleteUser } from '@/api/auth';

class User extends Component {
  state = {
    data: [],
    searchDrawerVisible: false
  };

  componentDidMount() {
    this.getUserList();
  }
  getUserList = async () => {
    const rowData = await getUsers();
    const data = rowData.data.map(el => ({ ...el, key: el.id }));
    if (data && data.length) {
      this.setState({ data });
    }
  };
  handleEdit = user => {
    console.log('%cindex.jsx line:27 this.props', 'color: #26bfa5;', this.props);
    this.props.history.push(`/users/edit/${user.id}`);
  };
  handleDelete = async id => {
    if (!id) return;
    await deleteUser(id);
  };
  handleExport = e => {
    e.preventDefault();
    const { form, BASE_API } = this.props;
    form.validateFields((err, values) => {
      try {
        if (!err) {
          const { token } = sessionStorage;
          let a = document.createElement('a');
          let url = `${BASE_API}/user/export?token=${token}`;
          let filename = 'myfile.zip';
          a.href = url;
          a.download = filename;
          a.click();
        }
      } catch (e) {
        console.log(e);
      }
    });
  };
  toggleDrawer = () => {
    this.setState({
      searchDrawerVisible: !this.state.searchDrawerVisible
    });
  };
  render() {
    return (
      <BasicLayout>
        <OptsBtnGroup
          search
          add
          download
          upload
          component="users"
          handleSearch={this.toggleDrawer}
          handleExport={this.handleExport}
        />
        <UserList
          data={this.state.data}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
        <SearchDrawer
          data={this.state.data}
          visible={this.state.searchDrawerVisible}
          onClose={this.toggleDrawer}
          history={this.props.history}
        />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API
});

export default connect(mapStateToProps)(Form.create()(User));
