import React, { Component } from 'react';
import { connect } from 'react-redux';
import BasicLayout from '@/layouts/BasicLayout';
import PermList from '@/components/Auth/PermList';
import { getPerms } from '@/api/auth';

class Permission extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.getPermList();
  }
  getPermList = async () => {
    const rowData = await getPerms();
    const data = rowData.data.map(el => ({ ...el, key: el.id }));
    if (data && data.length) {
      this.setState({ data });
    }
  };
  handleEdit = role => {
    this.props.history.push(`/perms/edit/${role.id}`);
  };
  render() {
    return (
      <BasicLayout>
        <PermList data={this.state.data} handleEdit={this.handleEdit} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API
});

export default connect(mapStateToProps)(Permission);
