import React, { Component } from 'react';
import BasicLayout from '@/layouts/BasicLayout';

class RoleAdd extends Component {
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <div>RoleAdd</div>
      </BasicLayout>
    );
  }
}

export default RoleAdd;
