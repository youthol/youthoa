import React, { Component } from 'react';
import BasicLayout from '@/layouts/BasicLayout';

class Permission extends Component {
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <div>Permission</div>
      </BasicLayout>
    );
  }
}

export default Permission;
