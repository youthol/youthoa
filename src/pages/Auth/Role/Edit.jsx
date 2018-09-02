import React, { Component } from 'react';
import BasicLayout from '@/layouts/BasicLayout';

class RoleEdit extends Component {
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <div>RoleEdit</div>
      </BasicLayout>
    );
  }
}

export default RoleEdit;
