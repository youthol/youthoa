import React, { Component } from 'react';
import BasicLayout from '@/layouts/BasicLayout';

class Role extends Component {
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <div>Role</div>
      </BasicLayout>
    );
  }
}

export default Role;
