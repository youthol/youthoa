import React, { Component } from 'react';
import RoleList from '@/components/Auth/RoleList';
import BasicLayout from '@/layouts/BasicLayout';
import OptsBtnGroup from '@/components/Auth/OptsBtnGroup';
import { getRoles } from '@/api/auth';

class Role extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.initialization();
  }
  initialization = async () => {
    const rowData = await getRoles();
    const data = rowData.data.map(el => ({ ...el, key: el.id }));
    if (data && data.length) {
      this.setState({ data });
    }
  };
  handleEdit = role => {
    this.props.history.push(`/roles/edit/${role.id}`);
  };
  render() {
    return (
      <BasicLayout>
        <OptsBtnGroup component="roles" add />
        <RoleList data={this.state.data} handleEdit={this.handleEdit} />
      </BasicLayout>
    );
  }
}

export default Role;
