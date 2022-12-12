import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Input } from 'antd';
import UserList from '@/components/Auth/UserList';
import {  deleteUser } from '@/api/auth';
import {withRouter} from 'react-router-dom'



// const { Column } = Table;

class SearchDrawer extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      data: [],
      visible: false
    };
  }
  componentWillReceiveProps() {
    if (!this.props.visible) {
      this.setState({
        searchText: '',
        data: []
      });
    }
  }
  searchConfirm = value => {
    const { data } = this.props;
    const result = data.filter(el => {
      return (
        el.name.includes(value) ||
        el.sdut_id.includes(value) ||
        el.department.includes(value) ||
        el.grade === Number(value) ||
        (el.phone && el.phone.includes(value))
      );
    });
    this.setState({ data: result });
  };
  onChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };


  handleEdit = user => {
    console.log(user)
  // console.log('%cSearchDrawer.jsx line:50 this.props', 'color: #26bfa5;', this.props);
    this.props.history.push(`/users/edit/${user.id}`);
  };
  handleDelete = async id => {
    console.log('%cSearchDrawer.jsx line:55 id', 'color: #26bfa5;', id);
    if (!id) return;
    await deleteUser(id);
  };

  render() {
    return (
      <Drawer
        title="Search"
        width={980}
        onClose={this.props.onClose}
        visible={this.props.visible}
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px'
        }}
      >
        <Input.Search
          placeholder="请输入姓名/学号/部门/联系方式等关键词查询"
          size="large"
          value={this.state.searchText}
          onSearch={val => this.searchConfirm(val)}
          onChange={this.onChange}
        />

        <UserList
          data={this.state.data}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
        
       {/* <Table dataSource={this.state.data} className="table-mt-30">
          <Column title="姓名" dataIndex="name" key="name" />
          <Column title="学号" dataIndex="sdut_id" key="sdut_id" />
          <Column title="部门" dataIndex="department" key="department" />
          <Column title="年级" dataIndex="grade" key="grade" />
          <Column title="联系方式" dataIndex="phone" key="phone" />
        </Table> */}
        
      </Drawer>
    );
  }
}

SearchDrawer.propTypes = {
  data: PropTypes.array,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // history: PropTypes.object.isRequired
};

export default withRouter(SearchDrawer);
